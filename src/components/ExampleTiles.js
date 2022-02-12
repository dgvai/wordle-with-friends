export default function ExampleTiles() {
  return (
    <div className="m-2 p-4 flex flex-col">
      <div className="flex flex-row justify-evenly">
        <img className="w-12 h-12 custom-animate-flip" src="/images/tiles/light_l.svg" alt="light_l" />
        <img className="w-12 h-12" src="/images/tiles/light_i.svg" alt="light_i" />
        <img className="w-12 h-12" src="/images/tiles/light_g.svg" alt="light_g" />
        <img className="w-12 h-12" src="/images/tiles/light_h.svg" alt="light_h" />
        <img className="w-12 h-12" src="/images/tiles/light_t.svg" alt="light_t" />
      </div>
      <span className="sm:ml-6 ml-4 my-2">The letter <b>L</b> is placed in correct position.</span>

      <div className="flex flex-row justify-evenly">
        <img className="w-12 h-12" src="/images/tiles/unity_u.svg" alt="unity_u" />
        <img className="w-12 h-12" src="/images/tiles/unity_n.svg" alt="unity_n" />
        <img className="w-12 h-12 custom-animate-flip" src="/images/tiles/unity_i.svg" alt="unity_i" />
        <img className="w-12 h-12" src="/images/tiles/unity_t.svg" alt="unity_t" />
        <img className="w-12 h-12" src="/images/tiles/unity_y.svg" alt="unity_y" />
      </div>
      <span className="sm:ml-6 ml-4 my-2">The letter <b>I</b> is in the word but misplaced.</span>

      <div className="flex flex-row justify-evenly">
        <img className="w-12 h-12" src="/images/tiles/point_p.svg" alt="point_p" />
        <img className="w-12 h-12" src="/images/tiles/point_o.svg" alt="point_o" />
        <img className="w-12 h-12" src="/images/tiles/point_i.svg" alt="point_i" />
        <img className="w-12 h-12 custom-animate-flip" src="/images/tiles/point_n.svg" alt="point_n" />
        <img className="w-12 h-12" src="/images/tiles/point_t.svg" alt="point_t" />
      </div>
      <span className="sm:ml-6 ml-4 my-2">The letter <b>N</b> is in not in the word.</span>
    </div>
  )
}