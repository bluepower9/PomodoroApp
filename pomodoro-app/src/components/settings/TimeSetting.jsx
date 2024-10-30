export default function TimeSetting({label, defaultTime, onTimeChange}) {
    return (
        <div class="flex flex-col w-24 rounded-xl justify-center items-center">
                <label class="mb-1 font-medium">{label}</label>
                <input 
                    type="number"
                    defaultValue={defaultTime}
                    onChange={onTimeChange}
                    class="w-16 rounded-lg text-center"
                />
        </div>
    );
}