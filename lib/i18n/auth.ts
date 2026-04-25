export const locales = ["pt-BR", "en-US", "es"] as const;

export type Locale = (typeof locales)[number];

type SearchParamsInput = Record<string, string | string[] | undefined>;

export const defaultLocale: Locale = "pt-BR";

export const localeLabels: Record<Locale, string> = {
  "pt-BR": "PT",
  "en-US": "EN",
  es: "ES",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

export async function getLocaleFromSearchParams(
  searchParams?: Promise<SearchParamsInput> | SearchParamsInput
) {
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  const value = Array.isArray(params?.lang) ? params?.lang[0] : params?.lang;

  return isLocale(value) ? value : defaultLocale;
}

export function localizedPath(path: string, locale: Locale) {
  return `${path}?lang=${locale}`;
}

export const authCopy = {
  "pt-BR": {
    shell: {
      eyebrow: "Tickpost",
      brand: "Tickpost",
      visualEyebrow: "Operacao comercial",
      visualTitle:
        "Acesso rapido para acompanhar campanhas, receitas e projetos.",
      highlightAnalytics:
        "Indicadores centralizados para times de marketing e vendas.",
      highlightSecurity:
        "Fluxo preparado para login, convite e recuperacao de acesso.",
      imageAlt: "Mesa com paineis de analise de marketing",
    },
    common: {
      corporateEmail: "Email corporativo",
      emailPlaceholder: "voce@empresa.com",
      password: "Senha",
      passwordPlaceholder: "Digite sua senha",
      minPassword: "Min. 8 caracteres",
      backToLogin: "Voltar para login",
      resend: "Reenviar",
      login: "Entrar",
      loginNow: "Entrar agora",
      goToLogin: "Ir para login",
    },
    login: {
      title: "Entrar na sua conta",
      description:
        "Acesse o painel para acompanhar campanhas, clientes, financeiro e projetos em um so lugar.",
      remember: "Manter conectado",
      forgotPassword: "Esqueci minha senha",
      noAccess: "Ainda nao tem acesso?",
      createAccount: "Criar conta",
    },
    register: {
      title: "Criar conta",
      description:
        "Informe os dados do responsavel para preparar o acesso inicial ao workspace.",
      firstName: "Nome",
      firstNamePlaceholder: "Ana",
      lastName: "Sobrenome",
      lastNamePlaceholder: "Silva",
      company: "Empresa",
      companyPlaceholder: "Nome da empresa",
      passwordPlaceholder: "Crie uma senha segura",
      terms:
        "Autorizo o uso dos dados para criar meu acesso e aceito os termos do workspace.",
      submit: "Criar conta",
      alreadyHave: "Ja tem uma conta?",
    },
    forgotPassword: {
      title: "Recuperar senha",
      description:
        "Digite o email cadastrado e enviaremos as instrucoes para redefinir o acesso.",
      emailLabel: "Email cadastrado",
      submit: "Enviar link de recuperacao",
    },
    emailConfirmation: {
      title: "Confirme seu email",
      description:
        "Enviamos um link de ativacao para o endereco informado. Abra a mensagem para liberar o acesso ao dashboard.",
      back: "Editar cadastro",
      cardTitle: "Email de confirmacao enviado",
      cardDescription:
        "Se a mensagem nao aparecer em alguns minutos, confira spam ou solicite um novo envio.",
    },
    passwordConfirmation: {
      title: "Confira seu email",
      description:
        "Enviamos um link seguro para redefinir sua senha. O acesso antigo continua bloqueado ate a nova senha ser criada.",
      back: "Trocar email",
      cardTitle: "Link de redefinicao enviado",
      cardDescription:
        "Por seguranca, o link expira em breve. Depois de abrir o email, voce podera criar uma nova senha.",
      resetPassword: "Redefinir senha",
    },
    resetPassword: {
      title: "Crie uma nova senha",
      description:
        "Use uma senha forte para recuperar o acesso ao workspace com seguranca.",
      newPassword: "Nova senha",
      newPasswordPlaceholder: "Digite a nova senha",
      confirmPassword: "Confirmar senha",
      confirmPasswordPlaceholder: "Repita a nova senha",
      submit: "Salvar nova senha",
    },
    passwordUpdated: {
      title: "Senha atualizada",
      description:
        "Sua nova senha foi salva. Agora voce ja pode entrar novamente no dashboard.",
      cardTitle: "Acesso recuperado com sucesso",
      cardDescription:
        "Use a nova senha no proximo login e mantenha seus dados em seguranca.",
      submit: "Entrar com nova senha",
    },
  },
  "en-US": {
    shell: {
      eyebrow: "Tickpost",
      brand: "Tickpost",
      visualEyebrow: "Commercial operations",
      visualTitle: "Fast access to track campaigns, revenue, and projects.",
      highlightAnalytics:
        "Centralized metrics for marketing and sales teams.",
      highlightSecurity:
        "Flow prepared for login, invitations, and account recovery.",
      imageAlt: "Desk with marketing analytics dashboards",
    },
    common: {
      corporateEmail: "Work email",
      emailPlaceholder: "you@company.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      minPassword: "Min. 8 characters",
      backToLogin: "Back to login",
      resend: "Resend",
      login: "Sign in",
      loginNow: "Sign in now",
      goToLogin: "Go to login",
    },
    login: {
      title: "Sign in to your account",
      description:
        "Access the workspace to track campaigns, clients, finance, and projects in one place.",
      remember: "Keep me signed in",
      forgotPassword: "Forgot password",
      noAccess: "Do not have access yet?",
      createAccount: "Create account",
    },
    register: {
      title: "Create account",
      description:
        "Enter the account owner's details to prepare the first workspace access.",
      firstName: "First name",
      firstNamePlaceholder: "Ana",
      lastName: "Last name",
      lastNamePlaceholder: "Silva",
      company: "Company",
      companyPlaceholder: "Company name",
      passwordPlaceholder: "Create a secure password",
      terms:
        "I authorize this data to be used to create my access and accept the workspace terms.",
      submit: "Create account",
      alreadyHave: "Already have an account?",
    },
    forgotPassword: {
      title: "Recover password",
      description:
        "Enter your registered email and we will send instructions to restore access.",
      emailLabel: "Registered email",
      submit: "Send recovery link",
    },
    emailConfirmation: {
      title: "Confirm your email",
      description:
        "We sent an activation link to the email provided. Open the message to unlock dashboard access.",
      back: "Edit registration",
      cardTitle: "Confirmation email sent",
      cardDescription:
        "If the message does not arrive in a few minutes, check spam or request a new email.",
    },
    passwordConfirmation: {
      title: "Check your email",
      description:
        "We sent a secure link to reset your password. The old access stays blocked until a new password is created.",
      back: "Change email",
      cardTitle: "Reset link sent",
      cardDescription:
        "For security, the link expires soon. After opening the email, you can create a new password.",
      resetPassword: "Reset password",
    },
    resetPassword: {
      title: "Create a new password",
      description:
        "Use a strong password to recover workspace access securely.",
      newPassword: "New password",
      newPasswordPlaceholder: "Enter the new password",
      confirmPassword: "Confirm password",
      confirmPasswordPlaceholder: "Repeat the new password",
      submit: "Save new password",
    },
    passwordUpdated: {
      title: "Password updated",
      description:
        "Your new password has been saved. You can now sign in to the dashboard again.",
      cardTitle: "Access recovered successfully",
      cardDescription:
        "Use the new password on your next login and keep your data secure.",
      submit: "Sign in with new password",
    },
  },
  es: {
    shell: {
      eyebrow: "Tickpost",
      brand: "Tickpost",
      visualEyebrow: "Operacion comercial",
      visualTitle:
        "Acceso rapido para seguir campanas, ingresos y proyectos.",
      highlightAnalytics:
        "Indicadores centralizados para equipos de marketing y ventas.",
      highlightSecurity:
        "Flujo preparado para inicio de sesion, invitaciones y recuperacion de acceso.",
      imageAlt: "Mesa con paneles de analitica de marketing",
    },
    common: {
      corporateEmail: "Email corporativo",
      emailPlaceholder: "tu@empresa.com",
      password: "Contrasena",
      passwordPlaceholder: "Ingresa tu contrasena",
      minPassword: "Min. 8 caracteres",
      backToLogin: "Volver al login",
      resend: "Reenviar",
      login: "Entrar",
      loginNow: "Entrar ahora",
      goToLogin: "Ir al login",
    },
    login: {
      title: "Entrar en tu cuenta",
      description:
        "Accede al panel para seguir campanas, clientes, finanzas y proyectos en un solo lugar.",
      remember: "Mantener sesion iniciada",
      forgotPassword: "Olvide mi contrasena",
      noAccess: "Aun no tienes acceso?",
      createAccount: "Crear cuenta",
    },
    register: {
      title: "Crear cuenta",
      description:
        "Ingresa los datos del responsable para preparar el primer acceso al workspace.",
      firstName: "Nombre",
      firstNamePlaceholder: "Ana",
      lastName: "Apellido",
      lastNamePlaceholder: "Silva",
      company: "Empresa",
      companyPlaceholder: "Nombre de la empresa",
      passwordPlaceholder: "Crea una contrasena segura",
      terms:
        "Autorizo el uso de los datos para crear mi acceso y acepto los terminos del workspace.",
      submit: "Crear cuenta",
      alreadyHave: "Ya tienes una cuenta?",
    },
    forgotPassword: {
      title: "Recuperar contrasena",
      description:
        "Ingresa el email registrado y enviaremos instrucciones para recuperar el acceso.",
      emailLabel: "Email registrado",
      submit: "Enviar enlace de recuperacion",
    },
    emailConfirmation: {
      title: "Confirma tu email",
      description:
        "Enviamos un enlace de activacion al email informado. Abre el mensaje para liberar el acceso al dashboard.",
      back: "Editar registro",
      cardTitle: "Email de confirmacion enviado",
      cardDescription:
        "Si el mensaje no aparece en unos minutos, revisa spam o solicita un nuevo envio.",
    },
    passwordConfirmation: {
      title: "Revisa tu email",
      description:
        "Enviamos un enlace seguro para redefinir tu contrasena. El acceso anterior sigue bloqueado hasta crear una nueva contrasena.",
      back: "Cambiar email",
      cardTitle: "Enlace de redefinicion enviado",
      cardDescription:
        "Por seguridad, el enlace expira pronto. Despues de abrir el email, podras crear una nueva contrasena.",
      resetPassword: "Redefinir contrasena",
    },
    resetPassword: {
      title: "Crea una nueva contrasena",
      description:
        "Usa una contrasena fuerte para recuperar el acceso al workspace con seguridad.",
      newPassword: "Nueva contrasena",
      newPasswordPlaceholder: "Ingresa la nueva contrasena",
      confirmPassword: "Confirmar contrasena",
      confirmPasswordPlaceholder: "Repite la nueva contrasena",
      submit: "Guardar nueva contrasena",
    },
    passwordUpdated: {
      title: "Contrasena actualizada",
      description:
        "Tu nueva contrasena fue guardada. Ahora puedes volver a entrar al dashboard.",
      cardTitle: "Acceso recuperado con exito",
      cardDescription:
        "Usa la nueva contrasena en tu proximo login y manten tus datos seguros.",
      submit: "Entrar con nueva contrasena",
    },
  },
} as const;
