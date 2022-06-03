import react, { useState, useEffect } from "react";
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





const Deficiencias = ({ idSelecionados }) => {
  const [arrayId, setArrayId] = useState([]);
  const [array, setArray] = useState();

  useEffect(() => {
    idSelecionados(arrayId);
  }, [arrayId]);

  // useEffect(() => {
  //   let merged;
  //   for (let i = 0; i < typeDef.length; i++) {
  //     merged = { ...array[i], ...typeDef[i] };
  //   }

  //   setArray([merged]);
  // }, [arrayId]);

  return (
    <View>
      <CheckboxComponent
        data={def}
        type="Deficiencia"
        text="Tipo de Deficiencias"
        idSelecionados={setArrayId}
      />

      {/* <CheckboxComponent
        data={array}
        type="Deficiencia"
        text="Tipo de Deficiencias"
        idSelecionados={setArrayId}
      /> */}
    </View>
  );
};

export default Deficiencias;
