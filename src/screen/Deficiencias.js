import react, { useState } from "react";
import { View } from "react-native";
import CheckboxComponent from "../components/CheckBox";

const def = [
  {
    id: 1,
    tipo: "AUDITIVA",
  },
  {
    id: 2,
    tipo: "VISUAL",
  },
  {
    id: 3,
    tipo: "MOTORA",
  },
  {
    id: 4,
    tipo: "INTELECTUAL",
  },
  {
    id: 5,
    tipo: "INTELECTUAL",
  },
];

const Deficiencias = () => {
  const [idCheckbox, setIdCheckbox] = useState([]);
  const [stateCheckbox, setStateCheckbox] = useState([]);


  const arrayFinal = () => {
    let array = [];
    for (let i = 0; i < stateCheckbox.length; i++) {
      if (stateCheckbox[i]) {
        console.log(stateCheckbox[i], idCheckbox[i]);
        let result = array.push(idCheckbox[i]);
      }
    }
    return array;
  };

  return (
    <View>
      <CheckboxComponent
        data={def}
        type="Deficiencia"
        text="Tipo de Deficiencias"
        idCheckbox={setIdCheckbox}
        stateCheckbox={setStateCheckbox}
      />

      <CheckboxComponent
        data={def}
        type="Deficiencia"
        text="Tipo de Deficiencias"
        idCheckbox={setIdCheckbox}
        stateCheckbox={setStateCheckbox}
      />
    </View>
  );
};

export default Deficiencias;
