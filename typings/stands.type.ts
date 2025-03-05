export interface StandsResponse {
  total_count: number;
  results: Stand[];
}

export interface Stand {
  coordonnees: Coordinates;
  equip_douche: boolean; //
  equip_nom: string; //
  equip_numero: string;
  equip_pasdetir: string; //
  equip_piste_nb: number; //
  equip_sanit: boolean; //
  equip_surf: number; //
  equip_utilisateur: string; //
  inst_adresse: string; //
  inst_com_nom: string; //
  inst_cp: string; //
  inst_nom: string; //
}

interface Coordinates {
  lon: number;
  lat: number;
}
