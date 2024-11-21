export default function TimeSetting({label, defaultTime, onTimeChange}) {
    return (
        <div class="relative flex items-center justify-between py-1 border-neutral-600">
                <label class="font-medium text-white">{label}</label>
                <input
                    type="number"
                    defaultValue={String(defaultTime)}
                    onChange={onTimeChange}
                    class="w-16 rounded-lg text-center bg-neutral-800 text-neutral-100"
                />
        </div>
    );
}