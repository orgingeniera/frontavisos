// Definir la interfaz para cada declaración
export interface IDeclaracion {
  id: number;
  n_declaracion: string;
  vigencia: string;
  periodo: string;
  fecha_declaracion: string;
  nit_contribuyente: string;
  razon_social: string;
  regimen: string;
  direccion: string;
  ciudad: string;
  correo_electronico: string;
  total_ingresos_brutos: string;
  menos_devoluciones_subsidios: string;
  menos_ingresos_fuera_municipio: string;
  menos_ventas_activos_exportacion: string;
  menos_ingresos_exentos_no_sujetos: string;
  total_ingresos_gravables: string;
  autoretencion_impuesto_industria_comercio: string;
  mas_autoretenciones_impuestos_avisos_tableros: string;
  total_autoretencion_mensual: string;
  created_at: string;
  updated_at: string;
}

// Definir la interfaz para IReporteData
export interface IReporteData {
  nit_contribuyente: string;
  razon_social: string;
  autoretencion_impuesto_industria_comercio: number;
  mas_autoretenciones_impuestos_avisos_tableros: number;
  imagenes: string[];
  declaraciones?: IDeclaracion[]; // Usar IDeclaracion[] en lugar de any[]
}
