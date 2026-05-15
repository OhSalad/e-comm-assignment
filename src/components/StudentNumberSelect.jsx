const studentNumbers = ['1', '2', '3', '4', '5'];

export function StudentNumberSelect({ id, value, onChange }) {
  return (
    <label className="field" htmlFor={id}>
      <span>Student number</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {studentNumbers.map((studentNumber) => (
          <option key={studentNumber} value={studentNumber}>
            {studentNumber}
          </option>
        ))}
      </select>
    </label>
  );
}
