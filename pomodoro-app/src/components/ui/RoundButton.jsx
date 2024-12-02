export default function RoundButton({text, styles, onButtonClick}) {
    return (
        <button class={`${styles} flex w-24 h-24 text-2xl rounded-full justify-center items-center transition hover:scale-110`} onClick={onButtonClick}>{text}</button>
    );
}