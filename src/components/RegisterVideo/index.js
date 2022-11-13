import React, { useState } from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js"

function useForm(props) {
    const [values, setValues] = useState(props.initialValue)

    return {
        values,
        handleChange: (e) => {
            const value = e.target.value
            const name = e.target.name
            setValues({ ...values, [name]: value })
        },
        clearForm: () => {
            setValues({})
        },
        submit() {
            if (values) {
                this.clearForm

                // Contrato entre o nosso Front e o BackEnd
                supabase.from("video").insert({
                    title: values.title,
                    url: values.url,
                    thumb: getThumbnail(values.url),
                    playlist: "games",
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }
}

const PROJECT_URL = "https://bukxpizzeyiubtzgodgi.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1a3hwaXp6ZXlpdWJ0emdvZGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyOTk3OTgsImV4cCI6MTk4Mzg3NTc5OH0.9SkCxtTbHY12Ro1qMrr1ntiexMtANYja39wGO5Ei95Y"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo(props) {
    console.log(supabase)
    const [formVisible, setFormVisible] = useState(false)
    const formRegister = useForm({ initialValue: { title: "", url: "" } })
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisible(true)}>+</button>
            {formVisible ?
                (<form onSubmit={(e) => {
                    e.preventDefault()
                    formRegister.submit()?setFormVisible(false):alert("Não é possível realizar a operação. Digite um valor!")
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisible(false)}>X</button>
                        <input type="text" placeholder="Título do vídeo" name="title"
                            value={formRegister.values.title}
                            onChange={formRegister.handleChange} />
                        <input type="text" placeholder="URL" name="url"
                            value={formRegister.values.url}
                            onChange={formRegister.handleChange}
                        />
                        <input type="select" />
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>)
                : false}
        </StyledRegisterVideo>
    )
}
/*
## O que precisamos para o form aparecer corretamente?
[X] Falta o botão para adicionar
[X] Modal
[X] Precisamos controlar o state
[X] Formulário em si
*/

/*
## O que precisamos para o form funcionar?
- pegar os dados, que precisam vir do state
    - titulo
    - url do vídeo 
- Precisamos ter um onSubmit do nosso form
- Limpar o formulário após o Submit
*/