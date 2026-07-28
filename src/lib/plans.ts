import { useCallback, useEffect, useState } from 'react';

export interface ApiPlanFeature {
  key: string;
  label: string;
}

export interface ApiPlanUserLimit {
  role: string;
  label: string;
  max: number | null;
}

export interface ApiPlanLimits {
  users?: ApiPlanUserLimit[];
  appointmentsPerWeek?: number | null;
}

export interface ApiPlan {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  price: string;
  billingPeriod: string;
  features: ApiPlanFeature[];
  featured?: boolean;
  limits?: ApiPlanLimits;
}

// Rota pública do Prime Visita (app real) que lista os planos ativos —
// ver src/app/api/plans/route.ts no projeto prime-visita. Usada tanto pela
// página de planos quanto pelo checkout, pra sempre listar os planos
// atualizados (nunca planos mockados/estáticos).
const PLANS_API_URL = 'https://app.primevisita.com.br/api/plans';

export function usePlans() {
  const [plans, setPlans] = useState<ApiPlan[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(PLANS_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const list: ApiPlan[] = Array.isArray(data.plans) ? data.plans : [];
        setPlans(list.slice().sort((a, b) => a.priceCents - b.priceCents));
      })
      .catch(() => setError('Não foi possível carregar os planos agora. Tente novamente em instantes.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { plans, loading, error, reload: load };
}

// Soma o limite de funcionários (todos os cargos) de um plano — null em
// qualquer cargo já torna o total "sem limite", já que não há teto real.
export function getEmployeeLimitLabel(plan: ApiPlan): string | null {
  const users = plan.limits?.users;
  if (!users || users.length === 0) return null;
  if (users.some((u) => u.max === null)) return 'Ilimitado';
  return String(users.reduce((sum, u) => sum + (u.max ?? 0), 0));
}
