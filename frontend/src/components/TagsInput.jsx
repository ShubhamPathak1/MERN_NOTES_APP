import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

const TagsInput = ({ tags, setTags, placeholder = "Tags" }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    const trimmedInput = input.trim();

    if ((e.key === "Enter" || e.key === ",") && trimmedInput) {
      e.preventDefault();

      if (tags.length >= 3) return; // 🚫 Do not allow more than 3 tags

      if (!tags.includes(trimmedInput)) {
        setTags([...tags, trimmedInput]);
      }

      setInput("");
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md focus-within:ring-0">
      {tags.map((tag, index) => (
        <span key={index} className="flex items-center bg-green-100 text-green-700 px-3 py-2 rounded-full text-lg">
          {tag}
          <button
            type="button"
            className="ml-2 text-green-500 hover:text-green-700"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </span>
      ))}
      {tags.length < 3 && (
        <Input
          variant='outline'
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className='flex-1 min-w-[120px] p-1'
        />
      )}
    </div>
  );
};

export default TagsInput;
