export default function RoundButton({text, styles, onButtonClick}) {
    return (
        <button class={`${styles} flex w-24 h-24 text-2xl rounded-full justify-center items-center`} onClick={onButtonClick}>{text}</button>
    );
}