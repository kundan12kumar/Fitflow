import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedMuscleGroup,
  onMuscleGroupChange,
  selectedEquipment,
  onEquipmentChange,
  muscleGroups,
  equipmentTypes
}) => {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={16} color="var(--color-text-tertiary)" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search exercises..."
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Muscle Group
          </label>
          <select
            value={selectedMuscleGroup}
            onChange={(e) => onMuscleGroupChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm bg-surface"
          >
            {muscleGroups.map((group) => (
              <option key={group} value={group === 'All' ? '' : group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Equipment
          </label>
          <select
            value={selectedEquipment}
            onChange={(e) => onEquipmentChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm bg-surface"
          >
            {equipmentTypes.map((equipment) => (
              <option key={equipment} value={equipment === 'All' ? '' : equipment}>
                {equipment}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;