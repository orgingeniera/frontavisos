export interface Ideclaracionmensual {
  id?: number | null;
  n_declaracion: string;
  vigencia: string;
  periodo: string; // Campo de tipo string
  fecha_declaracion: string;
  nit_contribuyente: string;
  razon_social: string;
  regimen: string;
  direccion: string;
  ciudad: string;
  correo_electronico: string;
  total_ingresos_brutos: number; // Total Ingresos Brutos Ordinarios y Extraordinarios
  menos_devoluciones_subsidios: number; // Menos Devoluciones y Subsidios
  menos_ingresos_fuera_municipio: number; // Menos Ingresos Obtenidos Fuera del Municipio
  menos_ventas_activos_exportacion: number; // Menos Ventas de Activos Fijos y Exportación
  menos_ingresos_exentos_no_sujetos: number; // Menos Ingresos por Actividades Exentas y No Sujetas
  total_ingresos_gravables: number; // Total Ingresos Gravables Autoretención
  autoretencion_impuesto_industria_comercio: number; // Autoretención de Impuesto de Industria y Comercio
  mas_autoretenciones_impuestos_avisos_tableros: number; // Más Autoretenciones de Impuestos de Avisos y Tableros
  total_autoretencion_mensual: number; // Total Autoretención Mensual
}

