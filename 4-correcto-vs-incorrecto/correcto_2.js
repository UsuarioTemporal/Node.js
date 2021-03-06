const usuarios = [
	{
		id: 1,
		nombre: 'thom',
		profesion_id: [1, 7]
	},
	{
		id: 2,
		nombre: 'carlos',
		profesion_id: [2, 1]
	},
	{
		id: 3,
		nombre: 'juan',
		profesion_id: [1, 3, 2]
	},
	{
		id: 4,
		nombre: 'Perez',
		profesion_id: [3, 2]
	}
]
const profesion = {
	1: 'programador',
	2: 'diseñador',
	3: 'Cocinero',
    7:'Chef',
    10:'teacher'
}

// mostrar usuarios con id 
const getUsers = (id)=>{
    return new Promise((resolve,reject)=>{
        let userDB = usuarios.find(user=>user.id===id)
        if(!userDB) return reject(`No se encontro al user : ${id}`)
        return resolve(userDB)
    })
}
const getProsession = (user)=>{
    return new Promise((resolve,reject)=>{
        user.profesion_id.filter((element)=>{
            if(!profesion[element]) return reject(`Error No encontrado la profesioncon este ID : ${element}`)
        })
        const {id,nombre} = user
        return resolve({
            id,
            nombre,
            profesiones:user.profesion_id.map(pro=>profesion[pro])
        })
    })
}
const fetchResult = async (id)=>{
    const response = await getUsers(id)
    const data = await getProsession(response)
    return data
}

fetchResult(1)
    .then(response=>console.log(response))
    .catch(err=>console.log(err))

// mostrar a todos los usuarios que tengan ese id profesion
const getUserProfession = (idProfession)=>{
    return new Promise((resolve,reject)=>{
        if(!profesion[idProfession]) return reject(`No existe ese id de profesion`)
        let arrUser = []
        usuarios.forEach(user=>{
            user.profesion_id.forEach(id=>{
                if(id===idProfession) arrUser.push(user)
            })
        })
        if(arrUser.length) return resolve(arrUser)
        return reject(`Este id existe pero ningun usuario lo ejerce`)
    })
}
const fetchResult_2 = async (id)=>{
    const response = await getUserProfession(id)
    return response;
}
fetchResult_2(10)
    .then(response=>console.log(response))
    .catch(err=>console.log(err))