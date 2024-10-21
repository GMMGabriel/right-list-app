import Realm from 'realm'

// Para abrir o Realm
export const getRealm = async (schema: Realm.ObjectSchema | Realm.ObjectSchema[]) => {
  const realm = await Realm.open({
    schema: Array.isArray(schema) ? schema : [schema],  // Verifica se é uma lista ou um schema único
    schemaVersion: 1,
  })
  return realm
}