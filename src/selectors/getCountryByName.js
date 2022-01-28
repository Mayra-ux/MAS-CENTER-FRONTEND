
export const GetCountryByName = (paises, name = '') =>{
    if ( name === '' ) {
        return [];
    }

    name = name.toLocaleLowerCase();
    return paises.filter( pais => pais.name.toLocaleLowerCase().includes( name )  );


}
