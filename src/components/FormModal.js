import React, { useState, useEffect } from 'react';

const FormModal = ({ isOpen, onClose, onSave, entity, entityConfig }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (entity) {
      setFormData(entity);
    } else {
      const emptyData = Object.keys(entityConfig).reduce((acc, key) => ({ ...acc, [key]: '' }), {});
      setFormData(emptyData);
    }
  }, [entity, entityConfig]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-sm mx-auto">
        <h2 className="text-lg font-bold mb-4">{entity ? `Edit ${entityConfig.type}` : `Create ${entityConfig.type}`}</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(entityConfig.fields).map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {entityConfig.fields[field].label}:
              </label>
              <input type={entityConfig.fields[field].type} value={formData[field] || ''} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} required
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save
            </button>
            <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
