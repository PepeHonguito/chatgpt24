import React from 'react';

const ServiceOrderToPrint = React.forwardRef(({ order }, ref) => {
  if (!order) return null;

  const companyName = "MobileTech"; 
  const companyAddress = "Av. Principal 123, Ciudad, País";
  const companyPhone = "+1 (555) 123-4567";
  const companyEmail = "info@mobiletech.com";

  return (
    <div ref={ref} className="p-8 bg-white text-black text-xs font-sans">
      <style type="text/css" media="print">
        {`
          @page { size: auto; margin: 0.5in; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none; }
        `}
      </style>
      <header className="mb-6 border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">{companyName}</h1>
            <p>{companyAddress}</p>
            <p>Tel: {companyPhone} | Email: {companyEmail}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold">Orden de Servicio / Presupuesto</h2>
            <p><strong>Nº de Orden:</strong> {order.orderNumber}</p>
            <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 border-b pb-1">Datos del Cliente</h3>
        <div className="grid grid-cols-2 gap-x-4">
          <p><strong>Nombre:</strong> {order.clientName}</p>
          <p><strong>DNI:</strong> {order.clientDNI}</p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 border-b pb-1">Detalles del Equipo y Servicio</h3>
        <div className="grid grid-cols-1 gap-y-1">
          <p><strong>Equipo:</strong> {order.equipmentDetails || 'No especificado'}</p>
          <p><strong>Falla Reportada:</strong> {order.reportedFault}</p>
          <p><strong>Contraseña/Patrón:</strong> {order.devicePassword || 'No provisto'}</p>
          <p><strong>Presupuesto Estimado:</strong> ${parseFloat(order.estimatedBudget).toFixed(2)}</p>
        </div>
      </section>
      
      {order.items && order.items.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Items del Presupuesto</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-1 pr-2">Descripción</th>
                <th className="py-1 px-2 text-center">Cant.</th>
                <th className="py-1 pl-2 text-right">Precio Unit.</th>
                <th className="py-1 pl-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-1 pr-2">{item.description}</td>
                  <td className="py-1 px-2 text-center">{item.quantity}</td>
                  <td className="py-1 pl-2 text-right">${parseFloat(item.price).toFixed(2)}</td>
                  <td className="py-1 pl-2 text-right">${(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right font-semibold py-1 pr-2">TOTAL PRESUPUESTO:</td>
                <td className="text-right font-semibold py-1 pl-2">${parseFloat(order.totalAmount).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </section>
      )}


      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 border-b pb-1">Condiciones del Servicio</h3>
        <ol className="list-decimal list-inside space-y-1 text-justify text-[10px] leading-tight">
          <li>Para retirar el producto arriba especificado, será condición necesaria y suficiente entregar el presente comprobante y abonar los servicios efectuados al mismo.</li>
          <li>Declaro que el o los equipos dejados en {companyName} son de mi exclusiva propiedad desligando a sus dueños y/o empleados de la empresa de toda responsabilidad civil o penal, quedando yo como único responsable.</li>
          <li>Toda operación tendrá un costo de presupuesto mínimo de $5000,00 (cinco mil pesos) el que se bonificará si acepta efectuar la reparación.</li>
          <li>Para productos en garantía quedan sin efecto las cláusulas tres (3).</li>
          <li>Sr. Cliente esta orden es constancia de garantía por el límite de 30 días de los equipos usados y 90 días los equipos nuevos, la garantía no incluye daños producidos por golpes, líquidos o mal uso del sistema de software (virus).</li>
          <li>Si el producto no fue retirado dentro de los 60 días a partir de la fecha de recepción del mismo por parte del cliente, será considerado derecho de los términos de los art. 2375, 2525, 2526 y 3940 del código civil quedando la Empresa facultada para darle el objetivo que considere pertinente sin necesidad de informarle previamente al cliente.</li>
          <li>En aquellos casos en que para la reparación del teléfono haya que sacar el MÓDULO del mismo o haya que cambiar de Gorilla Glass en vez del módulo del celular, LA EMPRESA NO SE HACE RESPONSABLE SI AL SACAR EL GORILLA GLASS SE RAYA/ROMPE EL TÁCTIL Y/O PANTALLA DEL CELULAR EN REPARACIÓN, pues es difícil saber si el Display/táctil están resentidos.</li>
          <li>El cliente bajo declaración jurada afirma que el producto/artículo a reparar es de su propiedad, y que ha leído y está de acuerdo y aprueba con su firma con las cláusulas 1 al 8 descriptas anteriormente.</li>
        </ol>
      </section>

      <footer className="mt-12 pt-6 border-t">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="mb-1">Firma del Cliente:</p>
            <div className="h-12 border-b border-gray-400"></div>
            <p className="text-center">Aclaración: ......................................</p>
          </div>
          <div>
            <p className="mb-1">Firma y Sello {companyName}:</p>
            <div className="h-12 border-b border-gray-400"></div>
          </div>
        </div>
        <p className="text-center mt-6 text-gray-600">¡Gracias por confiar en {companyName}!</p>
      </footer>
    </div>
  );
});
ServiceOrderToPrint.displayName = "ServiceOrderToPrint";
export default ServiceOrderToPrint;