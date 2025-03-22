export const translateCategory = (category: string): string => {
    const translations: { [key: string]: string } = {
      adapter: "ខ្សែរសាក",
      charger: "ដុំសាក",
      chargerSet: "ឈុតដុំសាក",
      earphone: "កាសត្រចៀក",
      airpods: "Airpods",
      case: "ស្រោមទូរស័ព្ទ",
      screenProtector: "កញ្ចក់ការពារអេក្រង់",
      stand: "ជើងទម្រ",
      lens: "Lens",
      all: "មើលទាំងអស់",
    };
  
    return translations[category] || category;
  };
  