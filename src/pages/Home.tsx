import React, { useCallback, useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import FormContact from "../components/FormContact/FormContact";
import { ContactType } from "../types";
import ItemContact from "../components/ItemContact/ItemContact";

const Home: React.FC = () => {
  const [list, setList] = useState<ContactType[]>([]);
  const [saveStorage, setSaveStorage] = useState<boolean>(false);

  useEffect(() => {
    const contactsStorage = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );

    setList(contactsStorage);
  }, []);

  useEffect(() => {
    if (saveStorage) {
      localStorage.setItem("contacts", JSON.stringify(list));
    }
  }, [list, saveStorage]);

  const addContact = useCallback((contact: ContactType) => {
    setSaveStorage(true);
    setList((state) => [...state, contact]);
  }, []);

  const deleteContact = useCallback((contact: ContactType) => {
    setSaveStorage(true);
    setList((state) => {
      const index = state.findIndex(
        (item) => item.name === contact.name && item.phone === contact.phone
      );

      if (index >= 0) {
        state.splice(index, 1);
      }

      return [...state];
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormContact action={addContact} />
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ padding: "5px" }}>
          {list.map((item) => {
            return (
              <ItemContact
                key={item.name}
                contact={item}
                actionDelete={() => deleteContact(item)}
              />
            );
          })}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
