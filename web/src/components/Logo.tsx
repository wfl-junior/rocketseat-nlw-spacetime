interface LogoProps extends React.ComponentPropsWithoutRef<"svg"> {}

export function Logo(props: LogoProps) {
  return (
    <svg
      width={161}
      height={48}
      viewBox="0 0 161 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10.762C0 4.818 4.818 0 10.762 0h40.85c5.943 0 10.761 4.818 10.761 10.762 0 5.943-4.818 10.761-10.761 10.761H35.64a2.477 2.477 0 100 4.954h114.363c5.944 0 10.762 4.818 10.762 10.761 0 5.944-4.818 10.762-10.762 10.762H10.762C4.818 48 0 43.182 0 37.238c0-5.943 4.818-10.761 10.762-10.761h15.971a2.477 2.477 0 100-4.954H10.762C4.818 21.523 0 16.705 0 10.762zm63.752 31.123c-.755 0-1.344-.106-1.769-.32a1.78 1.78 0 01-.891-.961c-.17-.427-.255-.954-.255-1.585v-3.57c0-1.024.228-1.78.685-2.264.456-.486 1.2-.73 2.23-.73h4.795c.733 0 1.292.04 1.68.121.387.08.582.163.582.248l-.318 1.328c-.18-.032-.714-.066-1.601-.105a99.78 99.78 0 00-3.862-.055h-.813c-.85 0-1.273.379-1.273 1.137v4.082c0 .363.093.643.278.84.186.198.518.296.995.296h.654c1.763 0 3.13-.019 4.102-.056.971-.037 1.574-.077 1.808-.12l.653 1.056c0 .053-.088.134-.262.24-.175.107-.497.202-.964.287-.468.085-1.141.129-2.022.129h-4.428l-.004.002zm-35.52 0v-8.13l-.159-1.297h7.056c.68 0 1.213.092 1.601.272.387.181.675.419.86.712.186.294.305.605.358.937.053.33.08.645.08.945v.945c0 .245-.037.52-.111.824a2.56 2.56 0 01-.414.88c-.201.282-.494.518-.876.704-.382.187-.881.28-1.498.28h-1.624c-.67 0-1.294-.017-1.872-.048a75.354 75.354 0 01-1.297-.08v3.058h-2.102l-.002-.002zm2.102-4.466h4.333c.478 0 .807-.118.987-.353.18-.234.27-.517.27-.848V35.21c0-.342-.09-.63-.27-.864-.18-.235-.505-.353-.971-.353h-4.349v3.426zm-17.298 4.466c-.723 0-1.253-.032-1.593-.095-.34-.064-.51-.14-.51-.224l.637-1.393c.244.042.852.082 1.824.12.971.038 2.307.056 4.006.056h.302c.456 0 .781-.082.972-.248.19-.165.286-.445.286-.84v-.32c0-.374-.077-.64-.23-.801-.154-.16-.497-.24-1.028-.24h-3.695c-1.072 0-1.853-.2-2.342-.6-.489-.4-.733-1.054-.733-1.962v-.256c0-.469.088-.9.263-1.296.175-.395.474-.712.9-.953.424-.24 1.008-.36 1.752-.36h4.333c.722 0 1.305.037 1.752.112.446.075.669.155.669.24l-.318 1.345c-.276-.031-.903-.066-1.88-.104-.976-.037-2.288-.056-3.934-.056l-.175-.016c-.49 0-.818.1-.988.296-.17.197-.26.445-.27.745v.271c0 .353.098.617.294.793.196.176.524.264.98.264h3.536c.68 0 1.259.069 1.736.208.478.139.844.392 1.098.76.255.369.382.91.382 1.625v.256c0 .8-.204 1.446-.614 1.936-.409.49-1.117.737-2.125.737h-5.287zm34.437-9.412l-4.667 9.412h2.325l1.035-2.033h5.703l.94 2.033h2.453l-4.651-9.412h-3.139zm3.807 5.811h-4.538l2.198-4.37h.159l2.181 4.37zm26.52-5.811v9.412h8.698c.7 0 1.195-.018 1.481-.055.287-.039.43-.078.43-.12l-.638-1.362h-7.868v-2.545h5.957v-1.585h-5.957v-2.21h7.805v-1.535H77.8zm20.182 9.412l-.016-7.89h-4.142v-1.537h10.418v1.536h-4.158v7.891h-2.102zm12.631-9.412v9.412h2.102v-9.412h-2.102zm9.589 9.413v-8.132l-.159-1.28h2.421l3.6 6.403 3.727-6.403h2.149v9.413h-2.102v-5.97h-.175l-.621 1.392-2.007 3.618h-1.927l-2.007-3.618-.637-1.393h-.159v5.97H120.202zm19.066-9.413v9.412h8.697c.701 0 1.195-.018 1.482-.055.286-.039.429-.078.429-.12l-.637-1.362h-7.869v-2.545h5.957v-1.585h-5.957v-2.21h7.805v-1.535h-9.907zM13.961 8.233v2.276l-3.034 1.226 3.034 1.232v2.278l-5.92-2.338h-.012v-2.335h.012l5.92-2.34zm34.493 6.891V12.85l3.032-1.225-3.032-1.224V8.125l5.912 2.337h.015V12.8h-.015l-5.912 2.325zM45.915 4.908l-3.477 11.855h2.065L47.98 4.908h-2.065zM23.522 10.32a3.65 3.65 0 00-.86-2.516 2.958 2.958 0 00-1.034-.746 2.811 2.811 0 00-1.232-.225 3.145 3.145 0 00-1.325.229 3.302 3.302 0 00-1.133.767V7.08h-2.064v8.29h2.064v-3.671c0-1.905.647-2.857 1.94-2.857.215-.01.432.033.63.125.199.091.376.23.518.405.301.4.455.902.43 1.413v4.585h2.066v-5.05zm2.628-6.687v11.854h2.064V3.632H26.15zm12.008 11.42h1.722l2.896-8.305H40.57l-1.626 4.982-1.675-4.982h-1.61l-1.675 4.966-1.627-4.966h-2.206l2.894 8.304h1.72l1.705-4.883 1.688 4.883z"
        fill="url(#paint0_linear_19_262)"
      />

      <defs>
        <linearGradient
          id="paint0_linear_19_262"
          x1={12.8968}
          y1={4.70915e-7}
          x2={200.883}
          y2={58.5056}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.251308} stopColor="#996DFF" />
          <stop offset={0.623787} stopColor="#FF876E" />
          <stop offset={1} stopColor="#FFD072" />
        </linearGradient>
      </defs>
    </svg>
  );
}