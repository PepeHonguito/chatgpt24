// Formulario para que los técnicos realicen un control de calidad básico

  // --- Estado del formulario ---
  // Información básica de carga

  // Sección de encendido
  const [powerStatus, setPowerStatus] = useState('si');
  const [powerIssue, setPowerIssue] = useState('logo');

  // Comprobaciones adicionales

  // Texto generado tras completar el formulario
  // Construir un informe legible basado en las selecciones
    if (powerStatus === 'si') {
    } else if (powerStatus === 'no') {
    } else {
      if (powerIssue === 'logo') rep += '- Se queda en el logo.\n';
      if (powerIssue === 'luz-apaga') rep += '- Da luz y se apaga.\n';
      if (powerIssue === 'ruido') rep += '- Hace ruido.\n';
    // Copiar al portapapeles
  // Renderizar formulario e informe generado
        <div>
          <Label className="mb-1 block">¿Enciende?</Label>
          <div className="flex gap-2">
            <Button variant={powerStatus === 'si' ? 'default' : 'outline'} onClick={() => setPowerStatus('si')}>
              Sí
            </Button>
            <Button variant={powerStatus === 'no' ? 'default' : 'outline'} onClick={() => setPowerStatus('no')}>
              No
            </Button>
            <Button variant={powerStatus === 'problema' ? 'default' : 'outline'} onClick={() => setPowerStatus('problema')}>
              Otro
            </Button>
          {powerStatus === 'problema' && (
            <select className="mt-2 w-full border rounded-md p-2" value={powerIssue} onChange={e => setPowerIssue(e.target.value)}>
              <option value="logo">Se queda en el logo</option>
              <option value="luz-apaga">Da luz y se apaga</option>
              <option value="ruido">Hace ruido</option>
            </select>
          )}
  const [buzzerWorking, setBuzzerWorking] = useState(true);
  const [speakerWorking, setSpeakerWorking] = useState(true);
  const [mic1Working, setMic1Working] = useState(true);
  const [mic2Working, setMic2Working] = useState(true);
  const [wifiIssue, setWifiIssue] = useState("ok");
  const [cameraFocus, setCameraFocus] = useState(true);
  const [report, setReport] = useState("");

  // 🧾 Función para generar el informe basado en los datos
  const generateReport = () => {
    let rep = "*Informe*\n";

    rep += orderNumber + " - " + equipo + " - " + falla + "\n\n";

    if (inspeccionVisual) {
      rep += "*Detalle:* " + inspeccionVisual + "\n\n";
    }

    rep += "*Diagnostico:*\n";
    if (onIndicator === "si") {
      rep += " - Enciende, Inicia normalmente.\n";

      if (chargingIndication === "no") {
        rep += " - No carga.\n";
      } else if (chargingIndication === "-") {
        rep += " - Carga: " + detalleCarga + "\n";
      } else {
        const val = parseFloat(usbValue);
        if (val >= 0.9) {
          rep += " - Carga normalmente.\n";
        } else if (val <= 0.6) {
          rep += " - Carga lento.\n";
        } else if (val === 0) {
          rep += " - Carga falsa / No carga.\n";
        } else {
          rep += " - No carga.\n";
        }
      }

      rep += touchWorks ? " - Tactil: ok\n" : " - Tactil: x\n";

      rep += signalWorking ? " - Señal: ok\n" : " - Señal: x\n";

      rep += buzzerWorking ? " - Buzzer: ok\n" : " - Buzzer: x\n";

      rep += speakerWorking ? " - Speaker: ok\n" : " - Speaker: x\n";

      rep += mic1Working ? " - Mic1: ok\n" : " - Mic1: x\n";

      rep += mic2Working ? " - Mic2: ok\n" : " - Mic2: x\n";

      rep += " - Wi-fi / Bluetooth: ";
      if (wifiIssue === "ok") rep += "ok\n";
      if (wifiIssue === "no-enciende") rep += "Falla IC de Wi-fi/Bluetooth.\n";
      if (wifiIssue === "baja-intensidad")
        rep += "Falla antena Wi-fi/Bluetooth.\n";
      if (wifiIssue === "sin-internet")
        rep += "Software o IC de Wi-fi/Bluetooth.\n";

      rep += " - Camaras: ";
      rep += cameraFocus ? "ok\n" : "x\n";
    } else if (onIndicator === "logo") {
      rep += " - No inicia. *Probar soft*\n";
    } else if (onIndicator === "sin imagen") {
      rep += " - No da imagen.\n";
    } else {
      rep += " - No enciende.\n";
    }

    if (onIndicator != "si") {
      if (chargingIndication === "no") {
        rep += " - No carga.\n";
      } else if (chargingIndication === "-") {
        rep += " - Carga: " + detalleCarga + "\n";
      } else {
        const val = parseFloat(usbValue);
        if (val >= 0.9) {
          rep += " - Carga normalmente.\n";
        } else if (val <= 0.6) {
          rep += " - Carga lento.\n";
        } else if (val === 0) {
          rep += " - Carga falsa / No carga.\n";
        } else {
          rep += " - No carga.\n";
        }
      }
    }

    rep += "\n *COTIZAR* ";
    setReport(rep);
  };

  // 📋 Función para copiar el informe al portapapeles
  const copyReport = () => {
    navigator.clipboard.writeText(report);
  };

  // 🖼️ Render del componente
  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-100 to-blue-100">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* 🔷 Título principal */}
        <h1 className="text-2xl font-bold text-center">Control de Calidad</h1>

        {/* INFORMACIÓN DEL EQUIPO */}
        <div>
          <Label className="mb-1 block font-medium text-gray-800">
            {/* 🔢 Campo: Número de orden */}
            Número de orden
          </Label>
          <input
            type="number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="1234"
          />
          <Label className="mb-1 block font-medium text-gray-800">
            {/* 🔢 Campo: Equipo */}
            Equipo
          </Label>
          <input
            type="text"
            value={equipo}
            onChange={(e) => setEquipo(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Samsung A22 5G"
          />
          <Label className="mb-1 block font-medium text-gray-800">
            {/* 🔢 Campo: Falla */}
            Falla declarada
          </Label>
          <input
            type="Text"
            value={falla}
            onChange={(e) => setFalla(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Modulo"
          />
          <Label className="mb-1 block font-medium text-gray-800">
            {/* 🔢 Campo: Número de orden */}
            Inspección visual
          </Label>
          <input
            type="textarea"
            value={inspeccionVisual}
            onChange={(e) => setInspeccionVisual(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Modulo roto, camara rota, mancha en pantalla, etc..."
          />
        </div>

        {/* ESCENCIALES DEL EQUIPO */}
        <div>
          <div>
            <Label className="mb-1 block font-medium text-gray-800">
              {/* ⚡ Pregunta: indicios de carga */}
              Encendido: ¿Llega hasta la pantalla principal?
            </Label>
            <p className="text-sm text-gray-500 mb-2">Puede no tener carga.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setOnIndicator("si")}
                className={`text-xs px-3 py-1 rounded transition font-semibold
        ${
          onIndicator === "si"
            ? "bg-green-500 text-white"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
              >
                SI
              </button>
              <button
                onClick={() => setOnIndicator("logo")}
                className={`text-xs px-3 py-1 rounded transition font-semibold
        ${
          onIndicator === "logo"
            ? "bg-red-500 text-white"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
              >
                Logo
              </button>
              <button
                onClick={() => setOnIndicator("sin imagen")}
                className={`text-xs px-3 py-1 rounded transition font-semibold
        ${
          onIndicator === "sin imagen"
            ? "bg-yellow-400 text-white"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
              >
                Sin imagen
              </button>
              <button
                onClick={() => setOnIndicator("no")}
                className={`text-xs px-3 py-1 rounded transition font-semibold
        ${
          onIndicator === "no"
            ? "bg-yellow-400 text-white"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
              >
                No
              </button>
            </div>
            {onIndicator === "no" && (
              <div>
                {/* 🔌 El equipo hace algo inusual */}
                <Label className="mb-1 block">Detalles: </Label>
                <Input
                  type="textarea"
                  placeholder="Se reinicia, queda en el logo..."
                />
              </div>
            )}
          </div>

          <div>
            <Label className="mb-1 block font-medium text-gray-800">
              {/* ⚡ Pregunta: indicios de carga */}
              Carga: ¿Muestra consumo?
            </Label>
            <p className="text-sm text-gray-500 mb-2">
              El valor de una carga normal es mayor a 1.0 en celulares.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setChargingIndication("si")}
                className={`text-xs px-3 py-1 rounded transition font-semibold
        ${
          chargingIndication === "si"
            ? "bg-green-500 text-white"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
              >
                SI
              </button>
              <button
                onClick={() => setChargingIndication("no")}
                className={`text-xs px-3 py-1 rounded transition font-semibold
        ${
          chargingIndication === "no"
            ? "bg-red-500 text-white"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
              >
                NO
              </button>
              <button
                onClick={() => setChargingIndication("-")}
                className={`text-xs px-3 py-1 rounded transition font-semibold
        ${
          chargingIndication === "-"
            ? "bg-yellow-400 text-white"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
              >
                -
              </button>
            </div>
            {chargingIndication === "si" && (
              <div>
                {/* 🔌 Campo adicional: valor del tester USB si respondió 'sí' */}
                <Label className="mb-1 block">Valor en TesterUSB (A)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={usbValue}
                  onChange={(e) => setUsbValue(e.target.value)}
                />
              </div>
            )}
            {chargingIndication === "-" && (
              <div>
                {/* 🔌 Campo adicional: valor del tester USB si respondió '-' */}
                <Label className="mb-1 block">Detalle:</Label>
                <Input
                  type="textarea"
                  value={detalleCarga}
                  onChange={(e) => setDetalleCarga(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* 🔌 El Equipo enciende */}
        <div>
          {onIndicator === "si" && (
            <div>
              <div>
                <Label className="mb-1 block">
                  {" "}
                  ¿El tactil responde en toda la pantalla?{" "}
                </Label>
                <input
                  type="checkbox"
                  checked={touchWorks}
                  onChange={(e) => setTouchWorks(e.target.checked)}
                />
              </div>

              <div>
                <Label className="mb-1 block">¿Tenemos señal SIM?</Label>
                <input
                  type="checkbox"
                  checked={signalWorking}
                  onChange={(e) => setSignalWorking(e.target.checked)}
                />
              </div>

              <div>
                <Label className="mb-1 block">Parlante 1 (Buzzer)</Label>
                <input
                  type="checkbox"
                  checked={buzzerWorking}
                  onChange={(e) => setBuzzerWorking(e.target.checked)}
                />
              </div>

              <div>
                <Label className="mb-1 block">Parlante 2 (Speaker)</Label>
                <input
                  type="checkbox"
                  checked={speakerWorking}
                  onChange={(e) => setSpeakerWorking(e.target.checked)}
                />
              </div>

              <div>
                <Label className="mb-1 block">
                  Microfono 1 (Mic principal, llamadas)
                </Label>
                <input
                  type="checkbox"
                  checked={mic1Working}
                  onChange={(e) => setMic1Working(e.target.checked)}
                />
              </div>

              <div>
                <Label className="mb-1 block">
                  Microfono 2 (Altavoz, WhatsApp Audio)
                </Label>
                <input
                  type="checkbox"
                  checked={mic2Working}
                  onChange={(e) => setMic2Working(e.target.checked)}
                />
              </div>

              <div>
                <Label className="mb-1 block">Cámaras</Label>
                <input
                  type="checkbox"
                  checked={cameraFocus}
                  onChange={(e) => setCameraFocus(e.target.checked)}
                />
              </div>

              <div>
                {/* 📡 Estado de conectividad Wi-Fi/Bluetooth */}
                <Label className="mb-1 block">Estado Wi-fi/Bluetooth</Label>
                <select
                  className="mt-1 w-full border rounded-md p-2"
                  value={wifiIssue}
                  onChange={(e) => setWifiIssue(e.target.value)}
                >
                  <option value="ok">Funciona</option>
                  <option value="no-enciende">
                    No enciende / no encuentra
                  </option>
                  <option value="baja-intensidad">Baja intensidad</option>
                  <option value="sin-internet">Se conecta sin internet</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* 🧾 Botón para generar el informe */}
        <Button onClick={generateReport} className="w-full">
          Generar Informe
        </Button>
        {/* 📋 Mostrar informe y botón de copia si existe resultado */}
        {report && (
          <div>
            <Textarea readOnly value={report} className="mt-4" />
            <Button variant="outline" onClick={copyReport} className="mt-2">
              Copiar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticPage;
