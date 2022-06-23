enum CardDetailsNames {
  manaCost = "Mana Cost",
  power = "Power",
  rarity = "Rarity",
}

type CardDetailsKeys = keyof typeof CardDetailsNames;
type CardDetailsMap = {
  [key in CardDetailsKeys]: string | number | boolean;
};

interface CardDetails extends CardDetailsMap {
  manaCost: string;
  power: string;
  rarity: string;
}

export { CardDetailsNames };
export type { CardDetailsKeys, CardDetails };
