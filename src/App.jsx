import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [towers, setTowers] = useState([
    {
      id: 0,
      disks: [
        { size: 1, className: "small" },
        { size: 2, className: "medium" },
        { size: 3, className: "big" },
      ],
    },
    { id: 1, disks: [] },
    { id: 2, disks: [] },
  ]);
  const [selectedDisk, setSelectedDisk] = useState();
  const [cursorPosition, setCursorPosition] = useState();
  const towersArr = towers.map((tower) => (
    <div
      onClick={() => (!selectedDisk ? holdDisk(tower.id) : placeDisk(tower.id))}
      className="tower"
      key={tower.id}
    >
      {tower.disks.map((disk) => (
        <p key={disk.size} className={disk.className}></p>
      ))}
    </div>
  ));
  function holdDisk(id) {
    if (!selectedDisk && towers[id].disks.length) {
      setSelectedDisk(towers[id].disks[0]);
      setTowers((prevTowers) =>
        prevTowers.map((tower) =>
          tower.id === id ? { ...tower, disks: tower.disks.slice(1) } : tower
        )
      );
    }
  }

  function placeDisk(id) {
    if (
      towers[id].disks.length === 0 ||
      selectedDisk.size < towers[id].disks[0].size
    ) {
      setTowers((prevTowers) =>
        prevTowers.map((tower) =>
          tower.id === id
            ? { ...tower, disks: [selectedDisk, ...tower.disks] }
            : tower
        )
      );
      setSelectedDisk();
    }
  }
  function updatePos(e) {
    document.querySelector("#flyingDisk").style.top = `${e.pageY - 10}px`;
    document.querySelector("#flyingDisk").style.left = `${e.pageX - 45}px`;
  }
  console.log(selectedDisk);
  return (
    <div onMouseMove={(e) => updatePos(e)} className="App">
      {towersArr}
      <div
        className={selectedDisk ? selectedDisk.className : ""}
        id="flyingDisk"
      ></div>
    </div>
  );
}

export default App;
