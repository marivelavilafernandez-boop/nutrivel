// Utilidades de formato de fechas y helpers para NutriPanel (Zona horaria: America/La_Paz)

export function formatDateLaPaz(dateInput: string | Date): string {
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return new Intl.DateTimeFormat('es-BO', {
      timeZone: 'America/La_Paz',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(d);
  } catch {
    return String(dateInput);
  }
}

export function formatDateTimeLaPaz(dateInput: string | Date): string {
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return new Intl.DateTimeFormat('es-BO', {
      timeZone: 'America/La_Paz',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(d);
  } catch {
    return String(dateInput);
  }
}

export function formatTimeLaPaz(dateInput: string | Date): string {
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return new Intl.DateTimeFormat('es-BO', {
      timeZone: 'America/La_Paz',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(d);
  } catch {
    return String(dateInput);
  }
}

export function getDaysRemaining(dueDateStr: string): { days: number; text: string; isUrgent: boolean } {
  try {
    const now = new Date();
    const due = new Date(dueDateStr);
    const diffMs = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { days: diffDays, text: `Venció hace ${Math.abs(diffDays)} d`, isUrgent: true };
    }
    if (diffDays === 0) {
      return { days: 0, text: 'Vence hoy', isUrgent: true };
    }
    if (diffDays === 1) {
      return { days: 1, text: 'Vence mañana', isUrgent: true };
    }
    return {
      days: diffDays,
      text: `En ${diffDays} días`,
      isUrgent: diffDays <= 3
    };
  } catch {
    return { days: 0, text: dueDateStr, isUrgent: false };
  }
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return '¡Buenos días';
  if (hour >= 12 && hour < 19) return '¡Buenas tardes';
  return '¡Buenas noches';
}
