// Voz do produto: as frases de interface mudam com design.tone (direto, caloroso, tecnico, formal, leve).
// Em pt-BR vale o tom escolhido; nos outros idiomas cai na frase-base traduzida por i18n.js. design.copy sobrescreve frases soltas.
import { t, lang } from './i18n.js';

// frase-base (igual ao texto histórico do kit, para manter as traduções)
const BASE = {
  greet: 'Olá, {x}', dashSub: 'Resumo da sua operação neste momento.', attention: 'Precisam da sua atenção',
  allGoodT: 'Tudo em dia', allGoodX: 'Nada precisa da sua atenção agora.',
  listSub: 'Busque, filtre e ordene. Abra um item para ver os detalhes.',
  emptyT: 'Nada por aqui ainda', emptyX: 'Quando houver {x}, eles aparecem aqui.',
  noResT: 'Nenhum resultado', noResX: 'Tente outro termo ou limpe os filtros.',
  newSub: 'Dois passos rápidos.', welcome: 'Bem-vindo, {x}.', saved: 'Salvo.', deleted: 'Apagado.', statusUp: 'Situação atualizada.', bye: 'Você saiu.',
  loginT: 'Entrar na demonstração', loginS: 'Escolha um perfil para explorar com dados fictícios. Nada é enviado a ninguém.',
  featuresT: 'O que você ganha', stepsT: 'Como funciona', plansT: 'Planos simples', plansLead: 'Sem fidelidade. Você começa pela demonstração, sem cadastro.',
  faqT: 'Dúvidas frequentes', ctaT: 'Veja funcionando em dois cliques', ctaX: 'Entre como {r} e explore com dados fictícios.',
};

const TONES = {
  direto: {
    greet: 'Olá, {x}', dashSub: 'Resumo da operação agora.', attention: 'Para olhar agora', allGoodT: 'Nada pendente', allGoodX: 'Sem alertas no momento.',
    listSub: 'Busque, filtre, ordene. Clique num item para abrir.', emptyT: 'Lista vazia', emptyX: 'Assim que houver {x}, a lista aparece aqui.',
    noResT: 'Nada encontrado', noResX: 'Mude o termo ou limpe os filtros.', newSub: 'Dois passos.', welcome: 'Pronto, {x}.', bye: 'Sessão encerrada.',
    loginT: 'Entre e veja funcionando', loginS: 'Escolha um perfil. Os dados são fictícios e nada sai deste computador.',
    featuresT: 'O que faz', stepsT: 'Como funciona', plansT: 'Preços', plansLead: 'Sem fidelidade. Teste antes, sem cadastro.', faqT: 'Perguntas comuns',
    ctaT: 'Teste agora, sem cadastro', ctaX: 'Entre como {r} e mexa nos dados de exemplo.',
  },
  caloroso: {
    greet: 'Que bom te ver, {x}', dashSub: 'Veja como estão as coisas por aqui.', attention: 'Merecem um olhar seu', allGoodT: 'Tudo tranquilo',
    allGoodX: 'Nada pedindo atenção agora. Dá tempo de um café.', listSub: 'Procure, filtre e abra o que quiser ver de perto.',
    emptyT: 'Ainda está vazio', emptyX: 'Quando chegarem {x}, é aqui que vão aparecer.', noResT: 'Não achamos nada',
    noResX: 'Tente outras palavras, ou limpe os filtros e comece de novo.', newSub: 'São só dois passos, sem pressa.', welcome: 'Que bom ter você aqui, {x}.',
    saved: 'Pronto, guardamos.', deleted: 'Tirado da lista.', bye: 'Até logo!', loginT: 'Entre e dê uma olhada',
    loginS: 'Escolha quem você quer ser por alguns minutos. Os dados são de mentirinha e ficam só aqui.',
    featuresT: 'O que você encontra', stepsT: 'Como funciona, na prática', plansT: 'Quanto custa', plansLead: 'Sem fidelidade e sem letra miúda. Experimente primeiro.',
    faqT: 'O que costumam nos perguntar', ctaT: 'Venha dar uma volta', ctaX: 'Entre como {r}. Os dados são de exemplo, pode mexer à vontade.',
  },
  tecnico: {
    greet: 'Sessão: {x}', dashSub: 'Indicadores calculados sobre os dados atuais.', attention: 'Exceções abertas', allGoodT: 'Sem exceções', allGoodX: 'Nenhum item fora do esperado.',
    listSub: 'Busca, filtros e ordenação por coluna. Enter abre o registro.', emptyT: 'Sem registros', emptyX: 'Nenhum registro de {x} até agora.',
    noResT: 'Zero resultados', noResX: 'Ajuste a consulta ou remova os filtros.', newSub: 'Duas etapas.', welcome: 'Sessão iniciada: {x}.', saved: 'Registro salvo.',
    deleted: 'Registro removido.', statusUp: 'Situação alterada.', bye: 'Sessão encerrada.', loginT: 'Acesso à demonstração', loginS: 'Selecione um perfil. Dados sintéticos, sem tráfego externo.',
    featuresT: 'Recursos', stepsT: 'Fluxo', plansT: 'Planos', plansLead: 'Sem contrato de permanência. Teste sem cadastro.', faqT: 'FAQ',
    ctaT: 'Rode a demonstração', ctaX: 'Entre como {r}; os dados são sintéticos.',
  },
  formal: {
    greet: 'Bem-vindo, {x}', dashSub: 'Panorama atual da operação.', attention: 'Itens que requerem atenção', allGoodT: 'Nenhuma pendência',
    allGoodX: 'Não há itens que requeiram sua atenção neste momento.', listSub: 'Pesquise, filtre e ordene. Abra um item para consultar os detalhes.',
    emptyT: 'Nenhum registro', emptyX: 'Os registros de {x} serão exibidos aqui quando existirem.', noResT: 'Nenhum resultado', noResX: 'Revise o termo de busca ou remova os filtros.',
    newSub: 'O cadastro tem duas etapas.', welcome: 'Acesso concedido, {x}.', saved: 'Registro salvo.', deleted: 'Registro excluído.', bye: 'Sessão encerrada.',
    loginT: 'Acesso à demonstração', loginS: 'Selecione um perfil para explorar dados fictícios. Nenhuma informação é transmitida.',
    featuresT: 'Funcionalidades', stepsT: 'Como funciona', plansT: 'Planos', plansLead: 'Sem fidelidade. A demonstração dispensa cadastro.', faqT: 'Perguntas frequentes',
    ctaT: 'Conheça a demonstração', ctaX: 'Acesse como {r} e consulte os dados fictícios.',
  },
  leve: {
    greet: 'Oi, {x}!', dashSub: 'O resumo de hoje, sem enrolação.', attention: 'Dá uma olhadinha', allGoodT: 'Tudo certo por aqui', allGoodX: 'Nada pedindo socorro agora.',
    listSub: 'Busque, filtre e clique para abrir. Simples assim.', emptyT: 'Por enquanto, nada', emptyX: 'Assim que chegarem {x}, aparecem aqui.',
    noResT: 'Hmm, nada encontrado', noResX: 'Tente outra palavra ou limpe os filtros.', newSub: 'Dois passinhos e pronto.', welcome: 'Oi, {x}! Fique à vontade.',
    saved: 'Salvo!', bye: 'Até já!', loginT: 'Entre e dê uma volta', loginS: 'Escolha um perfil. Os dados são de mentirinha e nada sai daqui.',
    featuresT: 'O que tem aqui dentro', stepsT: 'Como funciona', plansT: 'Quanto custa', plansLead: 'Sem fidelidade. Teste primeiro, sem cadastro.', faqT: 'Dúvidas comuns',
    ctaT: 'Bora testar?', ctaX: 'Entre como {r} e explore à vontade. Os dados são fictícios.',
  },
};

// chave de design.copy -> chave de voz
const COPY_KEYS = { featuresTitle: 'featuresT', stepsTitle: 'stepsT', plansTitle: 'plansT', plansLead: 'plansLead', faqTitle: 'faqT', ctaTitle: 'ctaT', ctaText: 'ctaX', loginTitle: 'loginT', loginSub: 'loginS', dashSub: 'dashSub', listSub: 'listSub', newSub: 'newSub' };

let design = null;
export function setVoice(d) { design = d; }

// v('greet', { x: 'Ana' }) -> frase no tom do produto
export function v(key, vars) {
  const base = BASE[key];
  if (lang !== 'pt' || !design) return t(base, vars);
  let text = null;
  const c = design.copy || {};
  for (const [ck, vk] of Object.entries(COPY_KEYS)) if (vk === key && c[ck]) text = c[ck];
  if (text == null) text = (TONES[design.tone] || TONES.direto)[key] ?? base;
  return vars ? text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : text;
}
