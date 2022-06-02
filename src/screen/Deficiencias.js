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

const type = [
  {
    id: 1,
    deficiencia: "ABC",
  },
  {
    id: 2,
    deficiencia: "ABCD",
  },
  {
    id: 3,
    deficiencia: "ABCDE",
  },
  {
    id: 4,
    deficiencia: "ABCDF",
  },
  {
    id: 5,
    deficiencia: "ABCG",
  },
];

const typeDef = [
  {
    id: 1,
    deficiencia: "1123",
  },
  {
    id: 2,
    deficiencia: "123",
  },
  {
    id: 3,
    deficiencia: "123",
  },
  {
    id: 4,
    deficiencia: "123",
  },
  {
    id: 5,
    deficiencia: "1233",
  },
];

const Deficiencias = ({ idSelecionados }) => {
  const [arrayId, setArrayId] = useState();
  const [array, setArray] = useState(type);

  useEffect(() => {
    idSelecionados(arrayId);
  }, [arrayId]);

  useEffect(() => {
    let merged;
    for (let i = 0; i < typeDef.length; i++) {
      merged = { ...array[i], ...typeDef[i] };
    }

    setArray([merged]);
  }, [arrayId]);

  return (
    <View>
      <CheckboxComponent
        data={def}
        type="Deficiencia"
        text="Tipo de Deficiencias"
        idSelecionados={setArrayId}
      />

      <CheckboxComponent
        data={array}
        type="Deficiencia"
        text="Tipo de Deficiencias"
        idSelecionados={setArrayId}
      />
    </View>
  );
};

export default Deficiencias;
