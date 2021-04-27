const colors = ['green', 'blue', 'purple', 'yellow', 'orange', 'red'];

let actualColor = ''

export const getRandomColor = ()=> {
    const diffColors = colors.filter((color)=> color !==actualColor)
    const randomColorIndex = Math.floor(Math.random() * diffColors.length);
    actualColor = diffColors[randomColorIndex]
    return diffColors[randomColorIndex];
  }

  
let actualTextColor = ''

export const getRandomTextColor = ()=> {
    const diffColors = colors.filter((color)=> color !==actualTextColor)
    const randomColorIndex = Math.floor(Math.random() * diffColors.length);
    actualTextColor = diffColors[randomColorIndex]
    return diffColors[randomColorIndex];
  }

export const getRandomSquareNumber = () => {
let arr = [];
    while(arr.length < 4){
        let r = Math.floor(Math.random() * 4);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}
export const getRandomAnswerNumber = () => {
let arr = [];
    while(arr.length < 2){
        let r = Math.floor(Math.random() * 4);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

export const propertieses = {'backgroundColor': 'BACKGROUND COLOR' , 'color' : 'NUMBER COLOR', 'shapeBackground' : "SHAPE COLOR"}

let lastProperty = '';
export const getRandomProperty = ()=> {
  const diffProperty = Object.keys(propertieses)
  let number = Math.floor(Math.floor(Math.random() * diffProperty.length));
  lastProperty = diffProperty[number]

  return diffProperty[number]
}
