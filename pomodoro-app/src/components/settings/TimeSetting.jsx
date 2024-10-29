export default function TimeSetting({label, defaultTime, onTimeChange}) {
    return (
        <div class="flex w-24">
                <label>
                    {label}
                    <br />
                    <input 
                        type="number"
                        defaultValue={defaultTime}
                        onChange={onTimeChange}
                        class="w-24"
                    />
                </label>
        </div>
    );
}