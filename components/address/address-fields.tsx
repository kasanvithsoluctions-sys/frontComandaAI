"use client";

import { useEffect, useRef, useState } from "react";
import type { RestaurantAddress } from "@/lib/api/restaurant-service";

type Country = { name: string; iso2: string; states: { name: string; state_code: string }[] };
const BASE = "https://countriesnow.space/api/v0.1/countries";
const names = new Intl.DisplayNames(["pt-BR"], { type: "region" });

function LocationPicker({ title, value, options, disabled, onSelect }: { title: string; value: string; options: { value: string; label: string }[]; disabled?: boolean; onSelect: (value: string) => void }) {
  const [search, setSearch] = useState("");
  const picker = useRef<HTMLDetailsElement>(null);
  const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const choose = (next: string) => { if (!next.trim()) return; onSelect(next.trim()); picker.current?.removeAttribute("open"); picker.current?.querySelector("summary")?.focus(); };
  const filtered = options.filter(option => normalize(option.label).includes(normalize(search)));
  return <div className="owner-label country-field"><span>{title}</span><details ref={picker} className="country-picker" onToggle={event => { if (!event.currentTarget.open) setSearch(""); }}><summary aria-label={`${title}: ${options.find(option => option.value === value)?.label || value || "Selecione"}`} aria-disabled={disabled} tabIndex={disabled ? -1 : 0} onClick={event => { if (disabled) event.preventDefault(); }}><span>{options.find(option => option.value === value)?.label || value || `Selecione ${title.toLowerCase()}`}</span><span aria-hidden="true">⌄</span></summary><div className="country-panel"><input aria-label={`Buscar ${title.toLowerCase()}`} placeholder="Buscar..." value={search} onChange={event => setSearch(event.target.value)} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); choose(search); } if (event.key === "Escape") picker.current?.removeAttribute("open"); }}/><div className="country-options">{search.trim() && !options.some(option => normalize(option.label) === normalize(search.trim())) && <button type="button" className="typed-location" onClick={() => choose(search)}>Usar “{search.trim()}”</button>}{filtered.map(option => <button type="button" key={option.value} className={value === option.value ? "selected" : ""} onClick={() => { onSelect(option.value); picker.current?.removeAttribute("open"); picker.current?.querySelector("summary")?.focus(); }}><span>{option.label}</span></button>)}{!filtered.length && <p className="country-help">Nenhum resultado encontrado.</p>}</div><small className="country-help">Escolha na lista ou digite e pressione Enter</small></div></details></div>;
}

export function AddressFields({ value, onChange }: { value: RestaurantAddress; onChange: (address: RestaurantAddress) => void }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  const countryPicker = useRef<HTMLDetailsElement>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [retry, setRetry] = useState(0);
  const latest = useRef(value); latest.current = value;
  const label = (country: Country) => names.of(country.iso2) || country.name;
  const country = countries.find(item => item.name === value.country || label(item) === value.country || item.iso2 === value.country);
  const brazil = country?.iso2 === "BR" || value.country === "Brasil";
  const state = country?.states.find(item => item.state_code === value.state || item.name === value.state);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setMessage("");
    fetch(`${BASE}/states`, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error();
      const result = await response.json();
      if (result.error || !Array.isArray(result.data)) throw new Error();
      setCountries(result.data);
    }).catch(() => { if (!controller.signal.aborted) setMessage("Não foi possível carregar os países. Tente novamente."); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [retry]);
  useEffect(() => {
    setCities([]);
    if (!country || (country.states.length > 0 && !state)) return;
    const controller = new AbortController();
    setLoading(true); setMessage("");
    const request = brazil && state
      ? fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.state_code}/municipios?orderBy=nome`, { signal: controller.signal }).then(async response => { if (!response.ok) throw new Error(); const data = await response.json(); return data.map((item: { nome: string }) => item.nome); })
      : fetch(`${BASE}/${state ? "state/cities" : "cities"}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: country.name, ...(state && { state: state.name }) }), signal: controller.signal }).then(async response => { if (!response.ok) throw new Error(); const data = await response.json(); if (data.error || !Array.isArray(data.data)) throw new Error(); return data.data; });
    request.then(data => setCities(data)).catch(() => { if (!controller.signal.aborted) setMessage("Não foi possível carregar as cidades. Tente novamente."); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [country, state, brazil, retry]);
  useEffect(() => {
    const cep = value.postalCode.replace(/\D/g, "");
    if (!brazil || cep.length !== 8) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setMessage("Consultando CEP...");
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: controller.signal });
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (data.erro) { setMessage("CEP não encontrado. Confira os números informados."); return; }
        onChange({ ...latest.current, country: "Brasil", state: data.uf, city: data.localidade, street: data.logradouro || "", neighborhood: data.bairro || "" });
        setMessage("Endereço preenchido. Informe o número e confira os demais campos.");
      } catch { if (!controller.signal.aborted) setMessage("Não foi possível consultar o CEP. Preencha o endereço ou tente novamente."); }
    }, 400);
    return () => { clearTimeout(timer); controller.abort(); };
  // The lookup runs only when the country or postal code changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brazil, value.postalCode]);
  const change = (patch: Partial<RestaurantAddress>) => onChange({ ...value, ...patch });
  return <><div className="onboarding-grid address-fields">
    <div className="owner-label country-field"><span id="country-label">País</span><details ref={countryPicker} className="country-picker"><summary aria-labelledby="country-label country-value"><span id="country-value">{country ? label(country) : value.country || "Selecione o país"}</span><span aria-hidden="true">⌄</span></summary><div className="country-panel"><input aria-label="Buscar país" placeholder="Buscar país..." value={countrySearch} onChange={event => setCountrySearch(event.target.value)} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); if (countrySearch.trim()) { change({ country: countrySearch.trim(), state: "", city: "", postalCode: "", street: "", neighborhood: "" }); setCountrySearch(""); countryPicker.current?.removeAttribute("open"); } } if (event.key === "Escape") countryPicker.current?.removeAttribute("open"); }}/><div className="country-options">{countrySearch.trim() && <button type="button" className="typed-location" onClick={() => { change({ country: countrySearch.trim(), state: "", city: "", postalCode: "", street: "", neighborhood: "" }); setCountrySearch(""); countryPicker.current?.removeAttribute("open"); }}>Usar “{countrySearch.trim()}”</button>}{countries.slice().sort((a, b) => label(a).localeCompare(label(b), "pt-BR")).filter(item => label(item).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(countrySearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())).map(item => <button type="button" key={item.iso2} className={country?.iso2 === item.iso2 ? "selected" : ""} onClick={() => { change({ country: label(item), state: "", city: "", postalCode: "", street: "", neighborhood: "" }); setCountrySearch(""); countryPicker.current?.removeAttribute("open"); countryPicker.current?.querySelector("summary")?.focus(); }}><span>{label(item)}</span><small>{item.iso2}</small></button>)}</div><small className="country-help">Escolha na lista ou digite e pressione Enter</small></div></details></div>
    <label className="owner-label">{brazil ? "CEP" : "Código postal"}<input required value={value.postalCode} maxLength={brazil ? 9 : 20} inputMode={brazil ? "numeric" : "text"} pattern={brazil ? "\\d{5}-\\d{3}" : undefined} onChange={event => { let text = event.target.value; if (brazil) { text = text.replace(/\D/g, "").slice(0, 8); if (text.length > 5) text = `${text.slice(0, 5)}-${text.slice(5)}`; } change({ postalCode: text }); }}/></label>
    <LocationPicker key={`state-${value.country}`} title="Estado / região" value={state?.state_code ?? value.state} disabled={!value.country} options={country?.states.map(item => ({ value: item.state_code, label: item.name })) ?? []} onSelect={state => change({ state, city: "", street: "", neighborhood: "" })}/>
    <LocationPicker key={`city-${value.country}-${value.state}`} title="Cidade" value={value.city} disabled={!value.country} options={cities.map(city => ({ value: city, label: city }))} onSelect={city => change({ city, neighborhood: "", street: "" })}/>
    <label className="owner-label">Bairro<input required value={value.neighborhood} maxLength={80} autoComplete="address-level3" placeholder="Digite o bairro" onChange={event => change({ neighborhood: event.target.value })}/></label>
    <label className="owner-label">Rua ou avenida<input required value={value.street} maxLength={120} autoComplete="address-line1" placeholder="Digite a rua ou avenida" onChange={event => change({ street: event.target.value })}/></label>
    <label className="owner-label">Número<input required type="number" min={1} max={999999} placeholder="Digite o número" value={value.number || ""} onChange={event => change({ number: Number(event.target.value) })}/></label>
    <label className="owner-label">Complemento (opcional)<input value={value.complement ?? ""} maxLength={80} onChange={event => change({ complement: event.target.value })}/></label>
  </div>{loading && <p role="status">Carregando localidades...</p>}{message && <p role="status">{message}</p>}{message.includes("Tente novamente") || message.includes("tente novamente") ? <button type="button" className="secondary" onClick={() => setRetry(current => current + 1)}>Tentar novamente</button> : null}</>;
}
