const colors = ['green', 'blue', 'purple', 'black', 'yellow', 'orange', 'red'];

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


  let actualNumber= -1;
export const getRandomSquareNumber = () => {
    let number;
    while (true) {
      number = Math.floor(Math.random() * 4) ;
      if (number !== actualNumber) {
        actualNumber = number;
        return actualNumber;
        break;
      }
    }
    
}
