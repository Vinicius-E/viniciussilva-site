// Internacionalização do Kit: o texto-fonte é o próprio português (a chave). Idiomas: pt (padrão), en, es.
// O conteúdo de cada produto (landing, campos, dados) vem traduzido da configuração; aqui ficam só as frases da interface.

export const LANGS = ['en', 'pt', 'es'];
const LOCALE = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };

function pick() {
  const ok = (l) => (LANGS.includes(l) ? l : null);
  let l = null;
  try { l = ok(new URLSearchParams(location.search).get('lang')); } catch { /* sem URL */ }
  try { l = l || ok(localStorage.getItem('kit-lang')); } catch { /* sem storage */ }
  return l || ok(window.__KIT_LANG) || 'pt';
}
export let lang = pick();
export const locale = () => LOCALE[lang];
let cur = 'BRL';
export const setCurrency = (c) => { if (/^[A-Z]{3}$/.test(c || '')) cur = c; };
export const currency = () => cur;
export function setLang(l) {
  if (!LANGS.includes(l)) return;
  try { localStorage.setItem('kit-lang', l); } catch { /* segue */ }
  const u = new URL(location.href);
  u.searchParams.set('lang', l);
  location.href = u.toString();
}
document.documentElement.lang = LOCALE[lang];

const D = {
  en: {
    'Algo deu errado. Tente novamente.': 'Something went wrong. Please try again.',
    'Mudar para o tema claro': 'Switch to light theme', 'Mudar para o tema escuro': 'Switch to dark theme',
    'Entrar': 'Sign in', 'Painel': 'Dashboard', 'Minha conta': 'My account', 'Novo {x}': 'New {x}',
    '{x} — página inicial': '{x} — home page', 'mai': 'May', 'jun': 'Jun', 'jul': 'Jul', 'ago': 'Aug', 'set': 'Sep', 'out': 'Oct',
    'Exemplo ilustrativo': 'Illustrative example', 'Conciliados': 'Reconciled', 'Pendentes': 'Pending', 'Ilustração com números de exemplo.': 'Illustration with sample numbers.',
    'Principal': 'Main', 'Recursos': 'Features', 'Planos': 'Plans', 'Dúvidas': 'FAQ', 'IA que roda no seu computador': 'AI that runs on your own computer',
    'Ver planos': 'See plans', 'O que você ganha': 'What you get', 'Como funciona': 'How it works', 'Planos simples': 'Simple plans',
    'Sem fidelidade. Você começa pela demonstração, sem cadastro.': 'No lock-in. Start with the demo, no sign-up.', 'Mais escolhido': 'Most popular',
    'Testar na demonstração': 'Try the demo', 'Dúvidas frequentes': 'Frequently asked questions', 'Veja funcionando em dois cliques': 'See it working in two clicks',
    'Entre como {r} e explore com dados fictícios.': 'Sign in as {r} and explore with fictional data.', ' ou ': ' or ',
    'Contato: ': 'Contact: ', 'Esta é uma demonstração com dados fictícios.': 'This is a demo with fictional data.',
    'Bem-vindo, {x}.': 'Welcome, {x}.', 'E-mail': 'Email', 'Senha': 'Password', 'Na demonstração, a senha é “demo”.': 'In the demo, the password is “demo”.',
    'Entrar na demonstração': 'Sign in to the demo', 'Escolha um perfil para explorar com dados fictícios. Nada é enviado a ninguém.': 'Pick a profile to explore with fictional data. Nothing is sent to anyone.',
    'Perfis de demonstração': 'Demo profiles', 'Entrar como {x}': 'Sign in as {x}', 'ou use e-mail e senha': 'or use email and password',
    '← Voltar para a página inicial': '← Back to the home page', 'Cliente (tenant)': 'Customer (tenant)', 'Cada cliente tem dados e sessão isolados.': 'Each customer has isolated data and session.',
    'Idioma': 'Language', 'Seções': 'Sections', 'Novo': 'New', 'Conta': 'Account', 'Modo demonstração — todos os dados são fictícios': 'Demo mode — all data is fictional',
    'Sair': 'Sign out', 'Você saiu.': 'You signed out.', 'Cliente: {x}': 'Customer: {x}',
    'Não conseguimos carregar': 'We could not load this', 'Verifique sua conexão e tente de novo.': 'Check your connection and try again.', 'Tentar de novo': 'Try again',
    'Indicadores': 'Indicators', 'Olá, {x}': 'Hello, {x}', 'Resumo da sua operação neste momento.': 'A snapshot of your operation right now.',
    'Precisam da sua atenção': 'Need your attention', 'Período': 'Period', 'Valor': 'Value', 'Tudo em dia': 'All caught up', 'Nada precisa da sua atenção agora.': 'Nothing needs your attention right now.',
    'Buscar por qualquer campo': 'Search any field', 'Filtrar por {x}': 'Filter by {x}', 'Todas: {x}': 'All: {x}', 'Ordenar por': 'Sort by',
    'mais recente': 'newest', 'mais antigo': 'oldest', 'Z–A': 'Z–A', 'A–Z': 'A–Z', 'maior': 'highest', 'menor': 'lowest', 'Ordenar: {x} ({y})': 'Sort: {x} ({y})',
    'Busque, filtre e ordene. Abra um item para ver os detalhes.': 'Search, filter and sort. Open an item to see its details.', 'Buscar': 'Search',
    '{n} resultado(s)': '{n} result(s)', 'Nenhum resultado': 'No results', 'Nada por aqui ainda': 'Nothing here yet', 'Tente outro termo ou limpe os filtros.': 'Try another term or clear the filters.',
    'Quando houver {x}, eles aparecem aqui.': 'When there are {x}, they show up here.', 'Limpar filtros': 'Clear filters', 'Criar o primeiro': 'Create the first one',
    'Ações': 'Actions', 'Ver detalhes': 'View details', ' de {x}': ' of {x}', '{n} {x} · página {p} de {q}': '{n} {x} · page {p} of {q}', 'Anterior': 'Previous', 'Próxima': 'Next',
    'Este item não existe mais.': 'This item no longer exists.', 'Alterar {x}': 'Change {x}', 'Salvar situação': 'Save status', 'Situação atualizada.': 'Status updated.',
    'Apagar {x}?': 'Delete {x}?', 'Esta ação não pode ser desfeita.': 'This action cannot be undone.', 'Apagar': 'Delete', 'Apagado.': 'Deleted.', 'Salvo.': 'Saved.',
    'Seu perfil ({x}) pode consultar e pedir análise, mas não alterar.': 'Your profile ({x}) can view and request analysis, but not change data.',
    'Análise da IA': 'AI analysis', 'A IA sugere; a decisão final é sua.': 'The AI suggests; the final decision is yours.',
    'Selecione…': 'Select…', 'Seu perfil não pode criar': 'Your profile cannot create', 'Entre como {x} para criar.': 'Sign in as {x} to create.', 'Voltar ao painel': 'Back to the dashboard',
    'Dois passos rápidos.': 'Two quick steps.', ' (opcional)': ' (optional)', '{x} é obrigatório.': '{x} is required.', '{x} deve ser um número, como 1250,90.': '{x} must be a number, like 1250.90.',
    'Corrija {n} campo(s) para continuar.': 'Fix {n} field(s) to continue.', 'Progresso': 'Progress', 'Passo {a} de {b}: {c}': 'Step {a} of {b}: {c}', 'Salvar': 'Save', 'Continuar': 'Continue', 'Voltar': 'Back', 'Cancelar': 'Cancel',
    'Seu perfil de demonstração e preferências.': 'Your demo profile and preferences.', 'Neste perfil você pode: {x}.': 'With this profile you can: {x}.',
    'consultar': 'view', 'criar': 'create', 'editar': 'edit', 'apagar': 'delete', 'usar a IA': 'use the AI', 'restaurar a demonstração': 'reset the demo',
    'Aparência': 'Appearance', 'Usar tema claro': 'Use light theme', 'Usar tema escuro': 'Use dark theme', 'Demonstração': 'Demo',
    'Apaga o que você criou e restaura os dados fictícios originais.': 'Deletes what you created and restores the original fictional data.', 'Restaurar dados': 'Reset data',
    'Restaurar a demonstração?': 'Reset the demo?', 'Tudo o que você criou ou alterou será descartado.': 'Everything you created or changed will be discarded.', 'Restaurar': 'Reset', 'Demonstração restaurada.': 'Demo reset.',
    'Produto indisponível': 'Product unavailable', 'Não foi possível carregar agora. Tente novamente em instantes.': 'Could not load right now. Please try again shortly.', 'Recarregar': 'Reload',
    'Fechar': 'Close', 'Confirmar': 'Confirm', 'Pular para o conteúdo': 'Skip to content', 'Carregando…': 'Loading…',
  },
  es: {
    'Algo deu errado. Tente novamente.': 'Algo salió mal. Inténtalo de nuevo.',
    'Mudar para o tema claro': 'Cambiar al tema claro', 'Mudar para o tema escuro': 'Cambiar al tema oscuro',
    'Entrar': 'Entrar', 'Painel': 'Panel', 'Minha conta': 'Mi cuenta', 'Novo {x}': 'Nuevo: {x}',
    '{x} — página inicial': '{x} — página de inicio', 'mai': 'may', 'jun': 'jun', 'jul': 'jul', 'ago': 'ago', 'set': 'sep', 'out': 'oct',
    'Exemplo ilustrativo': 'Ejemplo ilustrativo', 'Conciliados': 'Conciliados', 'Pendentes': 'Pendientes', 'Ilustração com números de exemplo.': 'Ilustración con números de ejemplo.',
    'Principal': 'Principal', 'Recursos': 'Funciones', 'Planos': 'Planes', 'Dúvidas': 'Preguntas', 'IA que roda no seu computador': 'IA que funciona en tu propio equipo',
    'Ver planos': 'Ver planes', 'O que você ganha': 'Qué obtienes', 'Como funciona': 'Cómo funciona', 'Planos simples': 'Planes simples',
    'Sem fidelidade. Você começa pela demonstração, sem cadastro.': 'Sin permanencia. Empieza con la demo, sin registro.', 'Mais escolhido': 'Más elegido',
    'Testar na demonstração': 'Probar la demo', 'Dúvidas frequentes': 'Preguntas frecuentes', 'Veja funcionando em dois cliques': 'Velo funcionando en dos clics',
    'Entre como {r} e explore com dados fictícios.': 'Entra como {r} y explora con datos ficticios.', ' ou ': ' o ',
    'Contato: ': 'Contacto: ', 'Esta é uma demonstração com dados fictícios.': 'Esta es una demostración con datos ficticios.',
    'Bem-vindo, {x}.': 'Te damos la bienvenida, {x}.', 'E-mail': 'Correo electrónico', 'Senha': 'Contraseña', 'Na demonstração, a senha é “demo”.': 'En la demo, la contraseña es “demo”.',
    'Entrar na demonstração': 'Entrar a la demo', 'Escolha um perfil para explorar com dados fictícios. Nada é enviado a ninguém.': 'Elige un perfil para explorar con datos ficticios. No se envía nada a nadie.',
    'Perfis de demonstração': 'Perfiles de demostración', 'Entrar como {x}': 'Entrar como {x}', 'ou use e-mail e senha': 'o usa correo y contraseña',
    '← Voltar para a página inicial': '← Volver a la página de inicio', 'Cliente (tenant)': 'Cliente (tenant)', 'Cada cliente tem dados e sessão isolados.': 'Cada cliente tiene datos y sesión aislados.',
    'Idioma': 'Idioma', 'Seções': 'Secciones', 'Novo': 'Nuevo', 'Conta': 'Cuenta', 'Modo demonstração — todos os dados são fictícios': 'Modo demostración — todos los datos son ficticios',
    'Sair': 'Salir', 'Você saiu.': 'Has cerrado sesión.', 'Cliente: {x}': 'Cliente: {x}',
    'Não conseguimos carregar': 'No pudimos cargar', 'Verifique sua conexão e tente de novo.': 'Revisa tu conexión e inténtalo de nuevo.', 'Tentar de novo': 'Reintentar',
    'Indicadores': 'Indicadores', 'Olá, {x}': 'Hola, {x}', 'Resumo da sua operação neste momento.': 'Resumen de tu operación en este momento.',
    'Precisam da sua atenção': 'Necesitan tu atención', 'Período': 'Período', 'Valor': 'Valor', 'Tudo em dia': 'Todo al día', 'Nada precisa da sua atenção agora.': 'Nada necesita tu atención ahora.',
    'Buscar por qualquer campo': 'Buscar en cualquier campo', 'Filtrar por {x}': 'Filtrar por {x}', 'Todas: {x}': 'Todos: {x}', 'Ordenar por': 'Ordenar por',
    'mais recente': 'más reciente', 'mais antigo': 'más antiguo', 'Z–A': 'Z–A', 'A–Z': 'A–Z', 'maior': 'mayor', 'menor': 'menor', 'Ordenar: {x} ({y})': 'Ordenar: {x} ({y})',
    'Busque, filtre e ordene. Abra um item para ver os detalhes.': 'Busca, filtra y ordena. Abre un elemento para ver los detalles.', 'Buscar': 'Buscar',
    '{n} resultado(s)': '{n} resultado(s)', 'Nenhum resultado': 'Sin resultados', 'Nada por aqui ainda': 'Aún no hay nada aquí', 'Tente outro termo ou limpe os filtros.': 'Prueba otro término o limpia los filtros.',
    'Quando houver {x}, eles aparecem aqui.': 'Cuando haya {x}, aparecerán aquí.', 'Limpar filtros': 'Limpiar filtros', 'Criar o primeiro': 'Crear el primero',
    'Ações': 'Acciones', 'Ver detalhes': 'Ver detalles', ' de {x}': ' de {x}', '{n} {x} · página {p} de {q}': '{n} {x} · página {p} de {q}', 'Anterior': 'Anterior', 'Próxima': 'Siguiente',
    'Este item não existe mais.': 'Este elemento ya no existe.', 'Alterar {x}': 'Cambiar {x}', 'Salvar situação': 'Guardar estado', 'Situação atualizada.': 'Estado actualizado.',
    'Apagar {x}?': '¿Eliminar {x}?', 'Esta ação não pode ser desfeita.': 'Esta acción no se puede deshacer.', 'Apagar': 'Eliminar', 'Apagado.': 'Eliminado.', 'Salvo.': 'Guardado.',
    'Seu perfil ({x}) pode consultar e pedir análise, mas não alterar.': 'Tu perfil ({x}) puede consultar y pedir análisis, pero no modificar.',
    'Análise da IA': 'Análisis de la IA', 'A IA sugere; a decisão final é sua.': 'La IA sugiere; la decisión final es tuya.',
    'Selecione…': 'Selecciona…', 'Seu perfil não pode criar': 'Tu perfil no puede crear', 'Entre como {x} para criar.': 'Entra como {x} para crear.', 'Voltar ao painel': 'Volver al panel',
    'Dois passos rápidos.': 'Dos pasos rápidos.', ' (opcional)': ' (opcional)', '{x} é obrigatório.': '{x} es obligatorio.', '{x} deve ser um número, como 1250,90.': '{x} debe ser un número, como 1250,90.',
    'Corrija {n} campo(s) para continuar.': 'Corrige {n} campo(s) para continuar.', 'Progresso': 'Progreso', 'Passo {a} de {b}: {c}': 'Paso {a} de {b}: {c}', 'Salvar': 'Guardar', 'Continuar': 'Continuar', 'Voltar': 'Volver', 'Cancelar': 'Cancelar',
    'Seu perfil de demonstração e preferências.': 'Tu perfil de demostración y preferencias.', 'Neste perfil você pode: {x}.': 'Con este perfil puedes: {x}.',
    'consultar': 'consultar', 'criar': 'crear', 'editar': 'editar', 'apagar': 'eliminar', 'usar a IA': 'usar la IA', 'restaurar a demonstração': 'restablecer la demo',
    'Aparência': 'Apariencia', 'Usar tema claro': 'Usar tema claro', 'Usar tema escuro': 'Usar tema oscuro', 'Demonstração': 'Demostración',
    'Apaga o que você criou e restaura os dados fictícios originais.': 'Elimina lo que creaste y restaura los datos ficticios originales.', 'Restaurar dados': 'Restablecer datos',
    'Restaurar a demonstração?': '¿Restablecer la demo?', 'Tudo o que você criou ou alterou será descartado.': 'Todo lo que creaste o cambiaste se descartará.', 'Restaurar': 'Restablecer', 'Demonstração restaurada.': 'Demo restablecida.',
    'Produto indisponível': 'Producto no disponible', 'Não foi possível carregar agora. Tente novamente em instantes.': 'No se pudo cargar ahora. Inténtalo de nuevo en unos instantes.', 'Recarregar': 'Recargar',
    'Fechar': 'Cerrar', 'Confirmar': 'Confirmar', 'Pular para o conteúdo': 'Saltar al contenido', 'Carregando…': 'Cargando…',
  },
};

/** t('texto em português {x}', { x: 1 }) → texto no idioma atual */
export function t(key, vars) {
  let s = (lang !== 'pt' && D[lang] && D[lang][key]) || key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split('{' + k + '}').join(String(v));
  return s;
}
export const dictSize = () => Object.keys(D.en).length;
export const dictKeys = (l) => Object.keys(D[l] || {});
