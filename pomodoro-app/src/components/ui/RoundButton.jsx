export default function RoundButton({text, styles, onButtonClick}) {
    return (
        <button class={`${styles} w-24 h-24 text-2xl rounded-full`} onClick={onButtonClick}>{text}</button>
    );
}