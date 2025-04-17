export default function Status({person, options, onChange}) {
    return (
        <select onChange={onChange} defaultValue={person.status}>
            {options.map(function(o) {
                return (
                    <option value={TextToCamelCase(o)}>{o}</option>
                )
            })}
        </select>
    )
}

function TextToCamelCase(title) {
    let res = title.charAt(0).toUpperCase()
    for (let i = 1; i < title.length; i++) {
        if (title.charAt(i) === " ") {
            i++
            res += title.charAt(i).toUpperCase()
        }
        else {
            res += title.charAt(i)
        }
    }
    return res
}
