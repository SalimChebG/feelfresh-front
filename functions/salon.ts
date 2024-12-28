export function getSalonId (url: string): number{
        return parseInt(url.split('/').at(-2)!,10)
    }
export function getSalonById2(salons, Id) {
         for (let i = 0; i < salons.length; i++) {
           if (Number(salons[i].id) === Number(Id)) {
               console.log('xxx Salon :', Number(salons[i].id) === Number(Id));
             return salons[i]; // Retourne le salon trouvé
           }
         }
         return null; // Aucun salon trouvé
       }


export function getSalonById(salons, id) {
  // Vérifier si salons est un tableau
  if (!Array.isArray(salons)) {
    console.error('Salons n\'est pas un tableau valide');
    return null;
  }

  // Vérifier si l'ID est valide
  if (isNaN(id)) {
    console.error('ID non valide :', id);
    return null;
  }

  // Trouver le salon
  const foundSalon = salons.find((salon) => salon.id === Number(id));

  if (!foundSalon) {
    console.warn(`Salon avec l'ID ${id} introuvable`);
  }

  return foundSalon;
}
