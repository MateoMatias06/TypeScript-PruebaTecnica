import { SortBy, type User } from "../types.d"

interface Props {
    changeSorting: (sort: SortBy) => void
    showColors: boolean
    users: User[]
    deleteUser: (email: string) => void
}
export function UsersList({ changeSorting, deleteUser, showColors, users }: Props) {

    return (
        <table width='100%'>
            <thead >
                <tr>
                    <th>Foto</th>
                    <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
                    <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
                    <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody className={showColors ? 'table-showColors' : 'table'}>
                {
                    users.map((user) => {


                        return (
                            <tr key={user.email} id="hola">
                                <td>
                                    <img src={user.picture.thumbnail} />
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button onClick={() => deleteUser(user.email)}>
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )

}