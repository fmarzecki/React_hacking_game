const colors = ['green', 'blue', 'purple', 'black', 'yellow', 'orange', 'red'];

let actualColor = ''

export const getRandomColor = ()=> {
    const diffColors = colors.filter((color)=> color !==actualColor)
    const randomColorIndex = Math.floor(Math.random() * diffColors.length);
    actualColor = diffColors[randomColorIndex]
    return diffColors[randomColorIndex];
  }

export const getRandomSquareNumber = () => {
    return Math.floor(Math.random() * 4) ;
}
