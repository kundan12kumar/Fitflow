import React from "react";
import Icon from "../../../components/AppIcon";

const TabSystem = ({ activeTab, onTabChange, instructions, tips }) => {
  const tabs = [
    {
      id: "instructions",
      label: "Instructions",
      icon: "List"
    },
    {
      id: "tips",
      label: "Tips",
      icon: "Lightbulb"
    }
  ];

  const renderInstructions = () => {
    const instructionSteps = instructions.split('\n\n').filter(step => step.trim());
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="List" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Step-by-Step Instructions</h3>
        </div>
        <ol className="space-y-4">
          {instructionSteps.map((step, index) => (
            <li key={index} className="flex space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <p className="text-text-primary leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  };

  const renderTips = () => {
    const tipsList = tips.split('\n\n').filter(tip => tip.trim());
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
          <h3 className="text-lg font-semibold text-text-primary">Pro Tips</h3>
        </div>
        <div className="space-y-4">
          {tipsList.map((tip, index) => (
            <div key={index} className="flex space-x-4 p-4 bg-warning bg-opacity-5 rounded-lg border-l-4 border-warning">
              <div className="flex-shrink-0 pt-1">
                <Icon name="CheckCircle" size={16} color="var(--color-warning)" />
              </div>
              <p className="text-text-primary leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex" aria-label="Exercise content tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset flex items-center justify-center space-x-2 ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary bg-primary bg-opacity-5" :"text-text-secondary hover:text-text-primary hover:bg-gray-50"
              }`}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6" role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
        {activeTab === "instructions" && renderInstructions()}
        {activeTab === "tips" && renderTips()}
      </div>
    </div>
  );
};

export default TabSystem;