export default function GameBody() {

  const rows = 6;
  const cols = 5;

  const grid = [];

  for(var i = 0; i < rows; i++){
    grid.push([])
    for(var j = 0; j < cols; j++) {
      grid[i].push(`c${i+1}${j+1}`)
    }
  }

  return (
    <div className="w-full text-center flex justify-center">
      <div className="flex flex-col w-80 h-96 justify-evenly">
          {
            grid.map((row, i) => (
              <div className="flex flex-row justify-evenly align-middle mt-3" key={i}>
                {
                  row.map((col,i) => (
                    <div className="bg-gray-50 border-2 w-12 h-12 text-3xl font-bold" key={col}>A</div>
                  ))
                }
              </div>
            ))
          }
      </div>
    </div>
  )
}