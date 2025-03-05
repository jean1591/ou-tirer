export interface StandsResponse {
  total_count: number;
  results: Stand[];
}

export interface Stand {
  coordonnees: Coordinates;
  equip_acc_libre: boolean;
  equip_aps_nom: string; // Array
  equip_douche: boolean;
  equip_nom: string;
  equip_numero: string;
  equip_ouv_public_bool: boolean;
  equip_pasdetir: string; // Array || null
  equip_piste_nb: number; // Only display if > 0
  equip_sanit: boolean;
  equip_sol: string;
  equip_surf: number;
  equip_utilisateur: string; // Array
  inst_acc_handi_bool: boolean;
  inst_adresse: string;
  inst_com_nom: string;
  inst_cp: string;
  inst_nom: string;
  inst_obs: string | null;
}

interface Coordinates {
  lon: number;
  lat: number;
}
