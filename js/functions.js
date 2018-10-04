
  function putInLocalStorage (arr, local){
    let bla = JSON.stringify(arr);
    localStorage.setItem(local, bla);
  }
  
  function getFromLocalStorage (local){
    let result = JSON.parse(localStorage.getItem(local));
    return result
  }