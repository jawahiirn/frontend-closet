"use client"

export const FontTests = () => {
  const testText = "We will march to freedom or pave the path to for the people in line";

  const lexendWeights = [
    { weight: "font-thin", label: "Thin (100)" },
    { weight: "font-light", label: "Light (300)" },
    { weight: "font-normal", label: "Regular (400)" },
    { weight: "font-medium", label: "Medium (500)" },
    { weight: "font-semibold", label: "SemiBold (600)" },
    { weight: "font-bold", label: "Bold (700)" },
    { weight: "font-extrabold", label: "ExtraBold (800)" },
    { weight: "font-black", label: "Black (900)" },
  ];

  const quicksandWeights = [
    { weight: "font-light", label: "Light (300)" },
    { weight: "font-normal", label: "Regular (400)" },
    { weight: "font-medium", label: "Medium (500)" },
    { weight: "font-semibold", label: "SemiBold (600)" },
    { weight: "font-bold", label: "Bold (700)" },
  ];

  return (
    <>
      <span className={'flex text-center text-2xl font-quicksand'}>Designed and Tested by Jawahiir</span>
      <span className={'flex text-center text-2xl'}>Designed and Tested by Nabhan</span>
      <div className="p-5 w-full grid grid-cols-2 gap-10">
        {/* Lexend Font Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-6 font-sans">Lexend Font Family</h2>
          <div className="grid gap-6">
            {lexendWeights.map(({ weight, label }) => (
              <div key={weight} className="border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-sm mb-2 font-mono">{label}</div>
                <p className={`font-sans ${weight} text-xl leading-relaxed`}>
                  {testText}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quicksand Font Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-6 font-quicksand">Quicksand Font Family</h2>
          <div className="grid gap-6">
            {quicksandWeights.map(({ weight, label }) => (
              <div key={weight} className="border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-sm mb-2 font-mono">{label}</div>
                <p className={`font-quicksand ${weight} text-xl leading-relaxed`}>
                  {testText}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>

  );
}