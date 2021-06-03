const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp(functions.config().firebase);

const db=admin.firestore();
const app = express();

// Permite requisições cross-origin
app.use(cors({ origin: true }));

//Função para validar o token:
async function validaToken(tokenRecebido){
    const tokenQuerySnapshot = await db.collection("tokens").get();
    const tokens = [];
    tokenQuerySnapshot.forEach(
        (doc)=>{
            tokens.push({
                token: doc.data().token
            });
        }
    );

    let i = 0;
    for(i = 0; i<tokens.length; i++){
        if(tokens[i]["token"] === tokenRecebido){
            return true;
        }
    }
    return false;
}

//API para fazer login:
app.post('/login', async (req, res)=> {
    
    const reqemail = req.body.email;
    const reqsenha = req.body.senha;

    try {
        const usuariosQuerySnapshot = await db.collection("usuarios").get();
        const usuarios = [];
        usuariosQuerySnapshot.forEach(
            (doc)=>{
                usuarios.push({
                    email: doc.data().email,
                    senha: doc.data().senha
            });
            }
        );

        let i = 0;
        let token = "";
        for(i = 0; i<usuarios.length; i++){
            if(usuarios[i]["senha"] === reqsenha && usuarios[i]["email"] === reqemail){
                const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                token = genRanHex(128);
                break;
            }
        }
        
        if(token != ""){

            //Armazena o Token no BD
            const tokenDB = {
                token: token
            }
            await db.collection("tokens").add(tokenDB);

            res.status(200).json({
                mensagem: "Acesso autorizado",
                token: token
            });
        }else{
            res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }
    } catch (error) {
        res.status(500).send(error);
    } 
})

//API para fazer logout:
app.post('/logout', async (req, res)=> {

    const tokenQuerySnapshot = await db.collection("tokens").get();
    const tokens = [];
    tokenQuerySnapshot.forEach(
        (doc)=>{
            tokens.push({
                id: doc.id,
                token: doc.data().token
            });
        }
    );

    let i = 0;
    for(i = 0; i<tokens.length; i++){
        if(tokens[i]["token"] === req.headers.authorization){
            await db.collection("tokens").doc(tokens[i]["id"]).delete();
            res.status(200).json({
                mensagem: "Logout realizado com sucesso"
            })
        }
    }
    res.status(401).json({
            mensagem: "Token não autorizado"
        })

})

//API para criar animal:
app.post('/doacao', async (req, res) => {
    if(await validaToken(req.headers.authorization)){
        try{
            const animal = {
                nome: req.body.nome,
                especie: req.body.especie,
                sexo: req.body.sexo,
                idade: req.body.idade,
                raca: req.body.raca,
                descricao: req.body.descricao,
                observacao: req.body.observacao,
                url_imagem: req.body.url_imagem,
                nome_doador: req.body.nome_doador,
                telefone_doador: req.body.telefone_doador,
                endereco_doador: req.body.endereco_doador,
                observacao_doador: req.body.observacao_doador
            }
        
            const novoAnimal = await db.collection("animais").add(animal);
        
            res.status(200).json({
                id: novoAnimal.id,
                message: "Cadastrado com sucesso"
            });
        }catch (error) {
            res.status(400).json({
                mensagem: "O animal precisa conter os campos: nome, especie, sexo, idade, raca, descricao, observacao, url_imagem, nome_doador, telefone_doador, endereco_doador, observacao_doador"
            })
        }
    }else{
        res.status(401).json({
            mensagem: "Token não autorizado"
        })
    }
})

//API para buscar os dados de todos os animais:
app.get('/doacao', async (req, res) => {

    if(await validaToken(req.headers.authorization)){
        try {
            const animaisQuerySnapshot = await db.collection("animais").get();
            const animais = [];
            animaisQuerySnapshot.forEach(
                (doc)=>{
                    animais.push({
                        id: doc.id,
                        data:doc.data()
                });
                }
            );
            res.status(200).json(animais);
        } catch (error) {
            res.status(500).send(error);
        }    
    }else{
        res.status(401).json({
            mensagem: "Token não autorizado"
        })
    }
});

//API para buscar os dados de um único animal:
app.get('/doacao/:animalId', async (req,res) => {

    if(await validaToken(req.headers.authorization)){
        const animalId = req.params.animalId; 
        db.collection("animais").doc(animalId).get()
        .then(animal => {
            if(!animal.exists) throw new Error('Animal não encontrado');
            res.status(200).json({id:animal.id, data:animal.data()})})
        .catch(error => res.status(500).send(error));        
    }else{
        res.status(401).json({
            mensagem: "Token não autorizado"
        })
    }
});

//API para deletar os dados de um animal:
app.delete('/doacao/:animalId', async (req, res) => {
    if(await validaToken(req.headers.authorization)){
        db.collection("animais").doc(req.params.animalId).delete()
        .then(()=>res.status(200).json({
            message: "Deletado com sucesso"
        }))
        .catch(function (error) {
            res.status(500).send(error);
        });    
    }else{
        res.status(401).json({
            mensagem: "Token não autorizado"
        })
    }
})

//API para alterar os dados de um animal: 
app.put('/doacao/:animalId', async (req, res) => {
    if(await validaToken(req.headers.authorization)){
        await db.collection("animais").doc(req.params.animalId).set(req.body,{merge:true})
        .then(()=> res.json({
            id:req.params.animalId,
            mensagem: "Alterado com sucesso"
        }))
        .catch((error)=> res.status(500).send(error))    
    }else{
        res.status(401).json({
            mensagem: "Token não autorizado"
        })
    }
});

exports.app = functions.https.onRequest(app);