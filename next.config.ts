import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  // Com output: 'export', isso faz o build gerar /pricing/index.html em vez
  // de /pricing.html — necessário porque a hospedagem estática em produção
  // não resolve "/pricing" pra um arquivo "pricing.html" sozinha (só serve
  // index.html dentro de uma pasta), causando 404 em acesso direto à rota.
  trailingSlash: true,
};

export default nextConfig;
