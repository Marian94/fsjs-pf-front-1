import React from "react";

export const Checkbox = ({name, id, label, onChange, value, className, checked}) => {
    return (      
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
              <input
              name={name}
              id={id}
              type="checkbox"
              value={value}
              checked={checked}
              onChange={onChange}
              className={className}
            />    
          </div>
          <input type="text" class="form-control" aria-label="Text input with checkbox" value={label} disabled/>
        </div>
      </div>
    );
  };