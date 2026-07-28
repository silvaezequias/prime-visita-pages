import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 shadow-3xs">
                <img
                  src="https://app.primevisita.com.br/icons/icon-512.png"
                  alt="Prime Visita"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-slate-900">
                Prime Visita
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              A melhor plataforma para gestão inteligente e otimizada de visitas
              médicas e relacionamento corporativo na área da saúde.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Funcionalidades
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity ml-1"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Planos e Preços
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity ml-1"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Guia do Usuário
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity ml-1"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Info Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
              Suporte & Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  Privacidade{" "}
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  Termos de Uso{" "}
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Social or newsletter mockup */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Conecte-se Conosco
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Descubra como otimizar o relacionamento com clínicas médicas e
              expandir sua cobertura.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#linkedin"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-2xs"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#github"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-2xs"
              >
                <Github className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-2xs"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright block */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} Prime Visita. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1">
            <span>Desenvolvido para excelência em</span>
            <span className="font-semibold text-slate-600">Gestão Médica</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
