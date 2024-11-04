
export interface Ivallas {
  id?: number | null;
  opcion: string;
  n_registro: string;
  fecha_instalacion: string;
  lugar_instalacion: string;
  donde_instalo: string;
  base_gravable: string;
  impuesto_pagar: number;
  contribuyente_id: number;
  image_path?: string;
  image_url?: string;
  isNearOneYear: boolean | true;
  meses_restantes?: number;
}

  