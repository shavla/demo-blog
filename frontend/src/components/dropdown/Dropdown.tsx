import { useState, useEffect, useRef } from "react";
import type { DropdownButton } from "../../models/types/dropdown.button.type";

const DropDown = ({ items }: { items: DropdownButton[] }) => {
    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDropdownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("pointerdown", handleClickOutside);
        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button className="btn m-1 bg-transparent border-none w-auto h-auto" onClick={handleDropdownClick}>
                ...
            </button>
            {open && (
                <ul className="menu dropdown-content bg-gray-50 rounded-box z-10 w-52 p-2 shadow-sm absolute right-0 top-full">
                    {items.map((item, index) => (
                        <li className={item.textColor} key={index}>
                            <a onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                                item.onClick();
                            }}>
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropDown;