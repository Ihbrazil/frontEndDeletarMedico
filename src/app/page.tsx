"use client";

import styles from "./page.module.css";
import { FormEvent, useState } from "react";
import { Rowdies, Quicksand } from 'next/font/google';

import axios, { AxiosError } from "axios";

const eduvic = Rowdies({ subsets: ['latin'], weight: ['300'] });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['600'] });

export default function Home() {

  const [idParaDeletar, setIdParaDeletar] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  async function handleDeletaMedico(event: FormEvent) {
    event.preventDefault();

    const endpoint = `http://localhost:9000/medicos/${idParaDeletar}`;

    try {
      await axios.delete(endpoint);
      setIdParaDeletar("");

      setMensagem("Médico deletado com sucesso");
      setErro(false);

    } catch (error) {

      type errorDataType = {
        mensagem: string;
      }

      const _erro = error as AxiosError;
      const _erroData = _erro.response?.data as errorDataType;
      const mensagemErro = _erroData?.mensagem || "erro desconhecido";

      if (_erro.response?.status === 400) {
        setMensagem("ID do médico é obrigatório");
      } else {
        setMensagem(mensagemErro);
      }
      setErro(true);
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={[styles.h1, eduvic.className].join(" ")}>Deletar Médico</h1>

      <form className={styles.form} onSubmit={handleDeletaMedico}>
        <input className={[styles.input, quicksand.className].join(" ")} placeholder="ID do médico" type="text" onChange={(inputId) => setIdParaDeletar(inputId.currentTarget.value)} value={idParaDeletar} required />

        {mensagem && (
        <p className={erro ? [styles.mensagem, styles.erro, quicksand.className].join(" ") : [styles.mensagem, styles.sucesso, quicksand.className].join(" ")}>
          {mensagem}
        </p>
      )}

        <button className={[styles.button, quicksand.className].join(" ")} type="submit">deletar</button>
      </form>
    </main>
  );
}