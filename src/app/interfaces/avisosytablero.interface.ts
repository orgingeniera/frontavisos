
export interface Iavisosytablero {
  id?: number | null;
  n_declaracion: string;
  vigencia: string;
  fecha_declaracion: string;
  nit_contribuyente: string;
  razon_social: string;
  regimen: string;
  direccion: string;
  ciudad: string;
  correo_electronico: string;
  total_ingresos_nacionales: number;
  menos_ingresos_fuera_municipio: number;
  total_ingresos_municipio: number;
  menos_ingresos_rebajas: number;
  menos_ingresos_exportaciones: number;
  menos_ingresos_venta_activos: number;
  menos_ingresos_no_gravados: number;
  menos_ingresos_exentos: number;
  total_ingresos_gravables: number;
  total_impuesto: number;
  capacidad_kw: number;
  impuesto_ley_56: number;
  total_industria_comercio: number;
  impuesto_avisos_tableros: number;
  pago_unidades_adicionales: number;
  sobretasa_bomberil: number;
  sobretasa_seguridad: number;
  total_impuesto_cargo: number;
}

  